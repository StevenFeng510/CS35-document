import{_ as s,c as t,a as l,o as e}from"./app-B8T7LOny.js";const i={};function a(d,n){return e(),t("div",null,n[0]||(n[0]=[l(`<h2 id="front-end-development-subscription-module" tabindex="-1"><a class="header-anchor" href="#front-end-development-subscription-module"><span>Front-end Development -- Subscription Module</span></a></h2><p>The technology stack for the front-end of this project is</p><ul><li>Svelte for building dynamic user interfaces.</li><li>TailwindCSS for styling.</li><li>Integration with RESTful APIs for data communication.</li></ul><h3 id="_1-selection-of-extensions" tabindex="-1"><a class="header-anchor" href="#_1-selection-of-extensions"><span>1. Selection of extensions</span></a></h3><p>First of all, based on the CS35-1 project requirements and our prototype diagram, we extend the code structure of Open_WebUI.</p><p>Add ‘Subscriptions’ and ‘My plan’ options to <code>src</code> | <code>lib</code> | <code>components</code> | <code>layout</code> | <code>Sidebar</code> | <code>UserMenu.svelte</code>, corresponding to the ‘Subscriptions’ and ‘My plan’ pages respectively.</p><div class="language-Svelte line-numbers-mode" data-highlighter="prismjs" data-ext="Svelte" data-title="Svelte"><pre><code><span class="line">&lt;DropdownMenu.Content&gt;</span>
<span class="line">...</span>
<span class="line">{#if $userSubscriptionStatus === 3 || $userSubscriptionStatus === 4}</span>
<span class="line">    &lt;button</span>
<span class="line">        class=&quot;flex rounded-md py-2 px-3 w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition&quot;</span>
<span class="line">        on:click={() =&gt; {</span>
<span class="line">            goto(customerPortalUrl);</span>
<span class="line">        }}</span>
<span class="line">    &gt;</span>
<span class="line">        &lt;div class=&quot; self-center mr-3&quot;&gt;</span>
<span class="line">            &lt;Plan className=&quot;size-5&quot; strokeWidth=&quot;1.5&quot; /&gt;</span>
<span class="line">        &lt;/div&gt;</span>
<span class="line">        &lt;div class=&quot; self-center font-medium&quot;&gt;{$i18n.t(&#39;My plan&#39;)}&lt;/div&gt;</span>
<span class="line">    &lt;/button&gt;</span>
<span class="line">{:else if $userSubscriptionStatus === 1 || $userSubscriptionStatus === 2}</span>
<span class="line">    &lt;button</span>
<span class="line">        class=&quot;flex rounded-md py-2 px-3 w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition&quot;</span>
<span class="line">        on:click={() =&gt; {</span>
<span class="line">            dispatch(&#39;show&#39;, &#39;subscriptions&#39;);</span>
<span class="line">            show = false;</span>
<span class="line">        }}</span>
<span class="line">    &gt;</span>
<span class="line">        &lt;div class=&quot; self-center mr-3&quot;&gt;</span>
<span class="line">            &lt;SubscribeBell className=&quot;size-5&quot; strokeWidth=&quot;1.5&quot; /&gt;</span>
<span class="line">        &lt;/div&gt;</span>
<span class="line">        &lt;div class=&quot; self-center font-medium&quot;&gt;{$i18n.t(&#39;Subscriptions&#39;)}&lt;/div&gt;</span>
<span class="line">    &lt;/button&gt;</span>
<span class="line">{/if}</span>
<span class="line">...</span>
<span class="line">&lt;/DropdownMenu.Content&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-added-subscriptionsmodal-svelte-component" tabindex="-1"><a class="header-anchor" href="#_2-added-subscriptionsmodal-svelte-component"><span>2. Added <code>SubscriptionsModal.svelte</code> component</span></a></h3><p>For displaying information about subscription packages (weekly/monthly/yearly), and service descriptions.</p><div class="language-Svelte line-numbers-mode" data-highlighter="prismjs" data-ext="Svelte" data-title="Svelte"><pre><code><span class="line">&lt;script lang=&quot;ts&quot;&gt;</span>
<span class="line">	import Modal from &#39;$lib/components/common/Modal.svelte&#39;;</span>
<span class="line">	import Card from &#39;$lib/components/common/Card.svelte&#39;;</span>
<span class="line">	import { getContext, onMount } from &#39;svelte&#39;;</span>
<span class="line">	import { getCheckoutSession } from &#39;$lib/apis/Subscription&#39;;</span>
<span class="line">	import Exclamation from &#39;$lib/components/icons/Exclamation.svelte&#39;;</span>
<span class="line">	import { userPaymentMethod, userSubscriptionStatus } from &#39;$lib/stores&#39;;</span>
<span class="line"></span>
<span class="line">	const i18n = getContext(&#39;i18n&#39;);</span>
<span class="line"></span>
<span class="line">	export let show = false;</span>
<span class="line"></span>
<span class="line">	let paymentsUrls = &#39;&#39;;</span>
<span class="line"></span>
<span class="line">	onMount(async () =&gt; {</span>
<span class="line">		const checkoutSession = await getCheckoutSession(localStorage.token);</span>
<span class="line">		if (checkoutSession[0]) {</span>
<span class="line">			paymentsUrls = checkoutSession[1];</span>
<span class="line">		}</span>
<span class="line">	});</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;Modal size=&quot;xl&quot; bind:show&gt;</span>
<span class="line">	&lt;div&gt;</span>
<span class="line">		&lt;div class=&quot; flex justify-between dark:text-gray-300 px-5 pt-4 pb-1&quot;&gt;</span>
<span class="line">			&lt;div class=&quot; text-lg font-medium self-center&quot;&gt;{$i18n.t(&#39;Subscriptions&#39;)}&lt;/div&gt;</span>
<span class="line">			&lt;button</span>
<span class="line">				class=&quot;self-center&quot;</span>
<span class="line">				on:click={() =&gt; {</span>
<span class="line">					show = false;</span>
<span class="line">				}}</span>
<span class="line">			&gt;</span>
<span class="line">				&lt;svg</span>
<span class="line">					xmlns=&quot;http://www.w3.org/2000/svg&quot;</span>
<span class="line">					viewBox=&quot;0 0 20 20&quot;</span>
<span class="line">					fill=&quot;currentColor&quot;</span>
<span class="line">					class=&quot;w-5 h-5&quot;</span>
<span class="line">				&gt;</span>
<span class="line">					&lt;path</span>
<span class="line">						d=&quot;M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z&quot;</span>
<span class="line">					/&gt;</span>
<span class="line">				&lt;/svg&gt;</span>
<span class="line">			&lt;/button&gt;</span>
<span class="line">		&lt;/div&gt;</span>
<span class="line"></span>
<span class="line">		{#if $userSubscriptionStatus === 1 &amp;&amp; $userPaymentMethod}</span>
<span class="line">			&lt;div class=&quot;flex flex-row justify-center gap-6 p-5&quot;&gt;</span>
<span class="line">				&lt;Card</span>
<span class="line">					title=&quot;Weekly&quot;</span>
<span class="line">					plan=&quot;weekly&quot;</span>
<span class="line">					price=&quot;5.99&quot;</span>
<span class="line">					subscriptionInterval=&quot;we&quot;</span>
<span class="line">					paymentsMethod={$userPaymentMethod}</span>
<span class="line">				&gt;</span>
<span class="line">					&lt;div class=&quot;text-sm pl-2 pt-2&quot;&gt;</span>
<span class="line">						&lt;p&gt;✓ Chat with Ollama&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Authentication and authorisation&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ User Registration&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Configuration management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Safety Functions&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Subscription Management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Payment System&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Customer Support&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Content Filtering&lt;/p&gt;</span>
<span class="line">					&lt;/div&gt;</span>
<span class="line">				&lt;/Card&gt;</span>
<span class="line"></span>
<span class="line">				&lt;Card</span>
<span class="line">					title=&quot;Yearly&quot;</span>
<span class="line">					plan=&quot;annually&quot;</span>
<span class="line">					price=&quot;199.99&quot;</span>
<span class="line">					subscriptionInterval=&quot;ye&quot;</span>
<span class="line">					recommend=&quot;recommend&quot;</span>
<span class="line">					paymentsMethod={$userPaymentMethod}</span>
<span class="line">				&gt;</span>
<span class="line">					&lt;div class=&quot;text-sm pl-2 pt-2&quot;&gt;</span>
<span class="line">						&lt;p&gt;✓ Chat with Ollama&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Authentication and authorisation&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ User Registration&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Configuration management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Safety Functions&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Subscription Management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Payment System&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Customer Support&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Content Filtering&lt;/p&gt;</span>
<span class="line">					&lt;/div&gt;</span>
<span class="line">				&lt;/Card&gt;</span>
<span class="line"></span>
<span class="line">				&lt;Card</span>
<span class="line">					title=&quot;Monthly&quot;</span>
<span class="line">					plan=&quot;monthly&quot;</span>
<span class="line">					price=&quot;19.99&quot;</span>
<span class="line">					subscriptionInterval=&quot;mo&quot;</span>
<span class="line">					paymentsMethod={$userPaymentMethod}</span>
<span class="line">				&gt;</span>
<span class="line">					&lt;div class=&quot;text-sm pl-2 pt-2&quot;&gt;</span>
<span class="line">						&lt;p&gt;✓ Chat with Ollama&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Authentication and authorisation&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ User Registration&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Configuration management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Safety Functions&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Subscription Management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Payment System&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Customer Support&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Content Filtering&lt;/p&gt;</span>
<span class="line">					&lt;/div&gt;</span>
<span class="line">				&lt;/Card&gt;</span>
<span class="line">			&lt;/div&gt;</span>
<span class="line">			&lt;div class=&quot;flex justify-end pr-8 pb-3 dark:text-white&quot;&gt;</span>
<span class="line">				&lt;Exclamation /&gt;</span>
<span class="line">				&lt;p class=&quot;pb-3 pl-2&quot;&gt;You can cancel your subscription at any time.&lt;/p&gt;</span>
<span class="line">			&lt;/div&gt;</span>
<span class="line">		{:else}</span>
<span class="line">			&lt;div class=&quot;flex flex-row justify-center gap-6 p-5&quot;&gt;</span>
<span class="line">				&lt;Card title=&quot;Weekly&quot; price=&quot;5.99&quot; subscriptionInterval=&quot;we&quot; paymentURL={paymentsUrls[0]}&gt;</span>
<span class="line">					&lt;div class=&quot;text-sm pl-2 pt-2&quot;&gt;</span>
<span class="line">						&lt;p&gt;✓ Chat with Ollama&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Authentication and authorisation&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ User Registration&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Configuration management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Safety Functions&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Subscription Management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Payment System&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Customer Support&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Content Filtering&lt;/p&gt;</span>
<span class="line">					&lt;/div&gt;</span>
<span class="line">				&lt;/Card&gt;</span>
<span class="line"></span>
<span class="line">				&lt;Card</span>
<span class="line">					title=&quot;Yearly&quot;</span>
<span class="line">					price=&quot;199.99&quot;</span>
<span class="line">					subscriptionInterval=&quot;ye&quot;</span>
<span class="line">					paymentURL={paymentsUrls[2]}</span>
<span class="line">					recommend=&quot;recommend&quot;</span>
<span class="line">				&gt;</span>
<span class="line">					&lt;div class=&quot;text-sm pl-2 pt-2&quot;&gt;</span>
<span class="line">						&lt;p&gt;✓ Chat with Ollama&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Authentication and authorisation&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ User Registration&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Configuration management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Safety Functions&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Subscription Management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Payment System&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Customer Support&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Content Filtering&lt;/p&gt;</span>
<span class="line">					&lt;/div&gt;</span>
<span class="line">				&lt;/Card&gt;</span>
<span class="line"></span>
<span class="line">				&lt;Card title=&quot;Monthly&quot; price=&quot;19.99&quot; subscriptionInterval=&quot;mo&quot; paymentURL={paymentsUrls[1]}&gt;</span>
<span class="line">					&lt;div class=&quot;text-sm pl-2 pt-2&quot;&gt;</span>
<span class="line">						&lt;p&gt;✓ Chat with Ollama&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Authentication and authorisation&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ User Registration&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Configuration management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Safety Functions&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Subscription Management&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Payment System&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Customer Support&lt;/p&gt;</span>
<span class="line">						&lt;p&gt;✓ Content Filtering&lt;/p&gt;</span>
<span class="line">					&lt;/div&gt;</span>
<span class="line">				&lt;/Card&gt;</span>
<span class="line">			&lt;/div&gt;</span>
<span class="line">			&lt;div class=&quot;flex justify-end pr-8 pb-3&quot;&gt;</span>
<span class="line">				&lt;Exclamation /&gt;</span>
<span class="line">				&lt;p class=&quot;pb-3 pl-2&quot;&gt;You can cancel your subscription at any time.&lt;/p&gt;</span>
<span class="line">			&lt;/div&gt;</span>
<span class="line">		{/if}</span>
<span class="line">	&lt;/div&gt;</span>
<span class="line">&lt;/Modal&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-added-card-svelte-component" tabindex="-1"><a class="header-anchor" href="#_3-added-card-svelte-component"><span>3. Added <code>Card.svelte</code> component</span></a></h3><p>The use of component-based design, thus increasing code reuse and avoiding code duplication.</p><div class="language-Svelte line-numbers-mode" data-highlighter="prismjs" data-ext="Svelte" data-title="Svelte"><pre><code><span class="line">&lt;script lang=&quot;ts&quot;&gt;</span>
<span class="line">	import { goto } from &#39;$app/navigation&#39;;</span>
<span class="line">	import { getPaymentSetupLink } from &#39;$lib/apis/Subscription&#39;;</span>
<span class="line"></span>
<span class="line">	export let title: string = &#39;&#39;;</span>
<span class="line">	export let subscriptionInterval: string = &#39;&#39;;</span>
<span class="line">	export let price: string = &#39;&#39;;</span>
<span class="line">	export let paymentURL: string = &#39;&#39;;</span>
<span class="line">	export let recommend: string = &#39;&#39;;</span>
<span class="line">	export let paymentsMethod: string = &#39;&#39;;</span>
<span class="line">	export let plan: string = &#39;&#39;;</span>
<span class="line"></span>
<span class="line">	import Sparkles from &#39;../icons/Sparkles.svelte&#39;;</span>
<span class="line"></span>
<span class="line">	const handleSubscribeButtonClick = async (plan: string) =&gt; {</span>
<span class="line">		if (paymentsMethod == &#39;Free-trial&#39;) {</span>
<span class="line">			const result = await getPaymentSetupLink(plan, localStorage.token);</span>
<span class="line">			if (result[0]) {</span>
<span class="line">				window.location.href = result[1];</span>
<span class="line">			}</span>
<span class="line">		}</span>
<span class="line">	};</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line">&lt;div class=&quot;relative&quot;&gt;</span>
<span class="line">	{#if recommend == &#39;recommend&#39;}</span>
<span class="line">		&lt;div</span>
<span class="line">			class=&quot;absolute -top-[22px] left-1/2 transform -translate-x-[48.7%] bg-teal-700 dark:bg-white text-white py-1 px-8 rounded-t-2xl rounded-b-none flex items-center justify-center space-x-2 z-10 w-[313px] dark:text-black&quot;</span>
<span class="line">		&gt;</span>
<span class="line">			&lt;Sparkles /&gt;</span>
<span class="line">			&lt;span class=&quot;text-sm font-bold whitespace-nowrap&quot;&gt;Best Recommended&lt;/span&gt;</span>
<span class="line">		&lt;/div&gt;</span>
<span class="line">	{/if}</span>
<span class="line"></span>
<span class="line">	&lt;div</span>
<span class="line">		class=&quot;card-container {recommend == &#39;recommend&#39;</span>
<span class="line">			? &#39;border-t-[10px] border-r-4 border-l-4 border-b-4 border-teal-700 dark:border-white rounded-2xl -translate-y-[10px]&#39;</span>
<span class="line">			: &#39;border border-gray-300 hover:outline outline-6 hover:outline-teal-700 dark:hover:outline-white rounded-2xl&#39;} w-full m-1 mb-3 flex flex-col max-w-sm overflow-hidden shadow-lg dark:text-white&quot;</span>
<span class="line">	&gt;</span>
<span class="line">		&lt;div class=&quot;px-4 py-4&quot;&gt;</span>
<span class="line">			&lt;div class=&quot;flex justify-center font-bold text-xl mb-2&quot;&gt;{title}&lt;/div&gt;</span>
<span class="line"></span>
<span class="line">			&lt;div class=&quot;flex justify-center my-9&quot;&gt;</span>
<span class="line">				&lt;div&gt;&lt;span class=&quot;pb-0&quot;&gt;$&lt;/span&gt;&lt;/div&gt;</span>
<span class="line">				&lt;span class=&quot;font-bold text-5xl pl-4&quot;&gt;{price}&lt;/span&gt;</span>
<span class="line">				&lt;span class=&quot;pt-5 pl-2&quot;&gt;/ {subscriptionInterval}&lt;/span&gt;</span>
<span class="line">			&lt;/div&gt;</span>
<span class="line"></span>
<span class="line">			&lt;p class=&quot;text-xs pr-2 text-right&quot;&gt;</span>
<span class="line">				billed {title.toLocaleLowerCase()}, approximately</span>
<span class="line">				{#if title == &#39;Yearly&#39;}$16.66 / mo</span>
<span class="line">				{:else if title == &#39;Monthly&#39;}$4.99 / we</span>
<span class="line">				{:else}</span>
<span class="line">					$0.87 / day</span>
<span class="line">				{/if}</span>
<span class="line">			&lt;/p&gt;</span>
<span class="line"></span>
<span class="line">			&lt;div class=&quot;flex justify-center py-2 mb-5&quot;&gt;</span>
<span class="line">				&lt;button</span>
<span class="line">					class=&quot;bg-teal-700 p-2 w-40 mt-4 rounded-lg text-white font-bold text-sm hover:bg-teal-600 hover:ring-2 hover:ring-teal-600&quot;</span>
<span class="line">					on:click={() =&gt;</span>
<span class="line">						paymentsMethod == &#39;Free-trial&#39; ? handleSubscribeButtonClick(plan) : goto(paymentURL)}</span>
<span class="line">				&gt;</span>
<span class="line">					Subscirbe now&lt;/button</span>
<span class="line">				&gt;</span>
<span class="line">			&lt;/div&gt;</span>
<span class="line"></span>
<span class="line">			&lt;!-- &lt;div class=&quot;flex justify-center py-5 text-sm&quot;&gt;</span>
<span class="line">				&lt;p&gt;</span>
<span class="line">					or &lt;a href={paymentURL}&gt;&lt;span class=&quot;font-bold underline&quot;&gt;Subscirbe now&lt;/span&gt;&lt;/a&gt;</span>
<span class="line">				&lt;/p&gt;</span>
<span class="line">			&lt;/div&gt; --&gt;</span>
<span class="line">			&lt;div class=&quot;flex justify-center&quot;&gt;</span>
<span class="line">				&lt;hr class=&quot;border-gray-600 bg-transparent w-11/12&quot; /&gt;</span>
<span class="line">			&lt;/div&gt;</span>
<span class="line">		&lt;/div&gt;</span>
<span class="line">		&lt;div class=&quot;px-8 pb-6&quot;&gt;</span>
<span class="line">			&lt;p&gt;All basic features:&lt;/p&gt;</span>
<span class="line">			&lt;slot /&gt;</span>
<span class="line">		&lt;/div&gt;</span>
<span class="line">	&lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-modifications-to-the-chat-svelte-component-permission-control" tabindex="-1"><a class="header-anchor" href="#_4-modifications-to-the-chat-svelte-component-permission-control"><span>4. Modifications to the <code>Chat.svelte</code> component (permission control)</span></a></h3><p>The <code>role</code> property is added to the <code>Chat.svelte</code> component, and the user role is retrieved in the <code>onMount</code> hook and stored in the <code>$user</code> object. Then, in the <code>Chat.svelte</code> component, the <code>$user?.role</code> is used to determine the user role, and based on the user role, it decides whether or not to display the <code>UnsubscribedUserOverlay</code>, which is required to prevent unsubscribed users from using the AI chat feature. Second, when a user has a history of chats, <code>(chatIdProp &amp;&amp; messages.length &gt; 0)</code>, we allow the user to view past chats.</p><div class="language-Svelte line-numbers-mode" data-highlighter="prismjs" data-ext="Svelte" data-title="Svelte"><pre><code><span class="line">{#if $user?.role != &#39;unsubscribed&#39; || (chatIdProp &amp;&amp; messages.length &gt; 0)}</span>
<span class="line">       ...</span>
<span class="line">        {#if $user?.role != &#39;unsubscribed&#39;}</span>
<span class="line">            &lt;div class={showControls ? &#39;lg:pr-[24rem]&#39; : &#39;&#39;}&gt;</span>
<span class="line">                &lt;MessageInput</span>
<span class="line">                    bind:files</span>
<span class="line">                    bind:prompt</span>
<span class="line">                    bind:autoScroll</span>
<span class="line">                    bind:selectedToolIds</span>
<span class="line">                    bind:webSearchEnabled</span>
<span class="line">                    bind:atSelectedModel</span>
<span class="line">                    availableToolIds={selectedModelIds.reduce((a, e, i, arr) =&gt; {</span>
<span class="line">                        const model = $models.find((m) =&gt; m.id === e);</span>
<span class="line">                        if (model?.info?.meta?.toolIds ?? false) {</span>
<span class="line">                            return [...new Set([...a, ...model.info.meta.toolIds])];</span>
<span class="line">                        }</span>
<span class="line">                        return a;</span>
<span class="line">                    }, [])}</span>
<span class="line">                    transparentBackground={$settings?.backgroundImageUrl ?? false}</span>
<span class="line">                    {selectedModels}</span>
<span class="line">                    {messages}</span>
<span class="line">                    {submitPrompt}</span>
<span class="line">                    {stopResponse}</span>
<span class="line">                /&gt;</span>
<span class="line">            &lt;/div&gt;</span>
<span class="line"></span>
<span class="line">          ...</span>
<span class="line">        {/if}</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">{:else}</span>
<span class="line">    &lt;UnsubscribedUserOverlay /&gt;</span>
<span class="line">{/if}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16)]))}const c=s(i,[["render",a],["__file","front-end.html.vue"]]),r=JSON.parse('{"path":"/development/frontend/front-end.html","title":"Frontend development","lang":"en-US","frontmatter":{"lang":"en-US","title":"Frontend development","description":"Description of this page"},"headers":[{"level":2,"title":"Front-end Development -- Subscription Module","slug":"front-end-development-subscription-module","link":"#front-end-development-subscription-module","children":[{"level":3,"title":"1. Selection of extensions","slug":"_1-selection-of-extensions","link":"#_1-selection-of-extensions","children":[]},{"level":3,"title":"2. Added SubscriptionsModal.svelte component","slug":"_2-added-subscriptionsmodal-svelte-component","link":"#_2-added-subscriptionsmodal-svelte-component","children":[]},{"level":3,"title":"3. Added Card.svelte component","slug":"_3-added-card-svelte-component","link":"#_3-added-card-svelte-component","children":[]},{"level":3,"title":"4. Modifications to the Chat.svelte component (permission control)","slug":"_4-modifications-to-the-chat-svelte-component-permission-control","link":"#_4-modifications-to-the-chat-svelte-component-permission-control","children":[]}]}],"git":{"updatedTime":1730103217000,"contributors":[{"name":"StevenFeng","email":"StevenFeng1020@outlook.com","commits":2}]},"filePathRelative":"development/frontend/front-end.md"}');export{c as comp,r as data};
