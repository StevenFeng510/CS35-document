import{_ as o,c as r,a as t,b as n,d as a,e as l,f as i,r as p,o as u}from"./app-BaRke6oO.js";const c="/CS35-document/assets/acr-DxQBL1Bu.png",d="/CS35-document/assets/webapp-B8cL2zTh.png",m="/CS35-document/assets/webapp_setup_1-DEYR0VWQ.png",g="/CS35-document/assets/webapp_setup_2-Bi89KPrW.png",h="/CS35-document/assets/webapp_setup_3-DM2Hlcq4.png",v="/CS35-document/assets/webapp_setup_4-F4XMvrJ2.png",b="/CS35-document/assets/webapp_setup_5-BVUbUJv4.png",y="/CS35-document/assets/webapp_setup_6-CKhHhRu-.png",k="/CS35-document/assets/webapp_setup_7-DWxZhpTt.png",f="/CS35-document/assets/webapp_setup_8-D8qSP3UM.png",q={};function w(S,e){const s=p("RouteLink");return u(),r("div",null,[e[24]||(e[24]=t('<h2 id="steps-to-deploy-your-project-using-docker-and-azure" tabindex="-1"><a class="header-anchor" href="#steps-to-deploy-your-project-using-docker-and-azure"><span>Steps to Deploy Your Project Using Docker and Azure</span></a></h2><h3 id="_1-abstract" tabindex="-1"><a class="header-anchor" href="#_1-abstract"><span>1. Abstract</span></a></h3><p>This project will use Docker to package a local application into a containerized environment, which enables smooth deployment to Azure. The application image is built locally, uploaded to the Azure Container Registry, and then deployed using Azure App Service, where environment variables are configured to ensure full functionality, including Stripe payment processing.</p><h3 id="_2-build-the-local-docker-image" tabindex="-1"><a class="header-anchor" href="#_2-build-the-local-docker-image"><span>2. Build the Local Docker Image</span></a></h3><ul><li><strong>Navigate to the directory containing your <code>Dockerfile</code> and run</strong></li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> buildx build <span class="token parameter variable">--platform</span> linux/amd64 <span class="token parameter variable">--load</span> <span class="token parameter variable">-t</span> <span class="token variable"><span class="token variable">`</span>your-image-name<span class="token variable">`</span></span> <span class="token builtin class-name">.</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>This command creates a Docker image that contains all necessary dependencies and configurations specified in the <code>Dockerfile</code>.</p><ul><li><strong>Run the Docker Container</strong></li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token variable"><span class="token variable">`</span>host-port<span class="token variable">`</span></span><span class="token builtin class-name">:</span> <span class="token variable"><span class="token variable">`</span>container-port<span class="token variable">`</span></span> <span class="token parameter variable">--name</span> <span class="token variable"><span class="token variable">`</span>your-container-name<span class="token variable">`</span></span> <span class="token variable"><span class="token variable">`</span>your-image-name<span class="token variable">`</span></span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><strong>Access the application</strong></li></ul><p>Open your browser and visit <code>http://localhost:&lt;host-port&gt;</code> to ensure the application is running successfully. The Stripe functionality may not be fully operational locally due to the absence of configured environment variables. It can be configured in the Azure environment instead in the next steps.</p><p>Our team also uploads the image to Docker Hub, which can be directly downloaded using the command:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> pull yiqinghu/capstone1016new:v1</span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>This allows collaborators or other environments to deploy the application without rebuilding the image locally.</p><h3 id="_3-create-azure-container-registry" tabindex="-1"><a class="header-anchor" href="#_3-create-azure-container-registry"><span>3. Create Azure Container Registry</span></a></h3><p>Creating an Azure Container Registry (ACR) will allow you to store and manage Docker images for deployment in Azure services.</p><ul><li><p><strong>Log in to the Azure Portal.</strong></p></li><li><p><strong>Select Create Resource &gt; Containers &gt; Container Registry.</strong></p></li></ul><p><img src="'+c+`" alt=""></p><ul><li><strong>Configure the Registry Details</strong></li></ul><p>Fill in the registry’s information:</p><ol><li><p><strong>Subscription</strong>: Choose the subscription where you want the registry to be billed.</p></li><li><p><strong>Resource Group</strong>: Either select an existing group or create a new one.</p></li><li><p><strong>Registry Name</strong>: Provide a unique name for your registry.</p></li><li><p><strong>Location</strong>: Select the closest or most suitable region for your use.</p></li></ol><ul><li><strong>Install Azure CLI</strong></li></ul><p>If you haven’t installed Azure CLI yet, you can follow the <a href="https://learn.microsoft.com/zh-cn/cli/azure/install-azure-cli" target="_blank" rel="noopener noreferrer">installation guide</a>. Login to Azure Container Registry: Open your command line interface and run:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">az acr login <span class="token parameter variable">--name</span> <span class="token operator">&lt;</span>your-acr-name<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><h5 id="tag-and-push-docker-image" tabindex="-1"><a class="header-anchor" href="#tag-and-push-docker-image"><span><strong>Tag and Push Docker Image</strong></span></a></h5></li></ul><p>Tag your local Docker image and push it to your Azure Container Registry with the following commands:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> tag <span class="token operator">&lt;</span>local-image-name<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>tag<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>your-acr-name<span class="token operator">&gt;</span>.azurecr.io/<span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>tag<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">docker</span> push <span class="token operator">&lt;</span>your-acr-name<span class="token operator">&gt;</span>.azurecr.io/<span class="token operator">&lt;</span>image-name<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>tag<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>This pushes your local Docker image to the remote Azure Container Registry. Adjust the local and remote names accordingly; the push process might take some time. After this, your image will be accessible in your Azure Container Registry, ready for deployment in other Azure services such as App Service</p><h3 id="_4-deploy-using-azure-app-service" tabindex="-1"><a class="header-anchor" href="#_4-deploy-using-azure-app-service"><span>4. Deploy Using Azure App Service</span></a></h3><ul><li><p>Log in to the Azure Portal.</p></li><li><p>Create an Azure App Service instance.</p></li></ul><p><img src="`+d+'" alt=".."></p><ul><li>Place the service in the resource group same as the container registry. Give the service a name. Specify <code>Container</code>, <code>Linux</code> and <code>Australia East</code>. For <code>Pricing plans</code>, the plan should be taken care of automatically and choose <code>Premium V3 P0V3</code> as the <code>Pricing plan</code>. Zone redundancy can be left as <code>Disabled</code> to save funds. Click on <code>Next: Database</code> to continue.</li></ul><br><img src="'+m+'" alt="Image" style="display:block;margin:auto;width:80%;height:auto;"><br><ul><li>Check <code>Create a Database</code>. Select <code>PostgreSQL - Flexible Server</code> as the engine. Everything else can be left as is. Click on <code>Next: Container</code> to continue.</li></ul><br><img src="'+g+'" alt="Image" style="display:block;margin:auto;width:80%;height:auto;"><br><ul><li>Select <code>Azure Container Registry</code>. The Registry, Image and Tag should be set automatically, but in any case, check that they are correct or specify the correct image manually. From here you can skip straight to <code>Review + create</code>.</li></ul><br><img src="'+h+'" alt="Image" style="display:block;margin:auto;width:80%;height:auto;"><br><ul><li>Before clicking on <code>Create</code>, scroll down to find the database username and password. Reveal the password and put it somewhere convenient. You will need it when setting the environment variables. If you accidentally forget the password, you can reset it in the database instance, under <code>Security/Authentication</code> and click on <code>Reset password</code>. You may now click on <code>Create</code> to create the Web App, the database, and the accompanying virtual network and subnets.</li></ul><br><img src="'+v+'" alt="Image" style="display:block;margin:auto;width:80%;height:auto;"><br><ul><li>The process of deployment may take several minutes. Azure will let you know when the deployment is done.</li></ul><br><img src="'+b+'" alt="Image" style="display:block;margin:auto;width:80%;height:auto;"><br><ul><li>Once deployment is complete, go to the database instance and reach the <code>Settings/Networking</code> page. Scroll to the very bottom where you will find a checkbox that says <code>Link private DNS zone to your virtual network</code>. Select it, and click <code>Save</code> in the top left corner. Then allow Azure to finish deployment. Upon successful deployment, continue to the next section.</li></ul><br><img src="'+y+`" alt="Image" style="display:block;margin:auto;width:80%;height:auto;"><br><h3 id="_5-environment-variables-settings" tabindex="-1"><a class="header-anchor" href="#_5-environment-variables-settings"><span>5. Environment Variables Settings</span></a></h3><ul><li>Several environment variables need to be set for the application to run successfully. The variables are listed below. Go to your application dashboard on Azure, and look in the list on the left of the page to find &#39;Environment variables&#39;. After reaching the page, click on <code>Advanced edit</code> and paste the variables below into the end of the list. Please note the comma at the very beginning and pay attention to keep the variables within the &quot;[......]&quot;. These serve as placeholders, until you have the information to set the actual values. Keep the environment variables page opened, until you&#39;ve completely set all variables. These instructions will let you know when you&#39;ve done so.</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">  ,{</span>
<span class="line">    &quot;name&quot;: &quot;ANNUALLY_PRICE&quot;,</span>
<span class="line">    &quot;value&quot;: &quot;&lt;replace with actual Stripe price ID&gt;&quot;,</span>
<span class="line">    &quot;slotSetting&quot;: false</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">    &quot;name&quot;: &quot;DATABASE_URL&quot;,</span>
<span class="line">    &quot;value&quot;: &quot;postgresql://&lt;username&gt;:&lt;password&gt;@&lt;database endpoint&gt;:5432/&lt;database name&gt;&quot;,</span>
<span class="line">    &quot;slotSetting&quot;: false</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">    &quot;name&quot;: &quot;MONTHLY_PRICE&quot;,</span>
<span class="line">    &quot;value&quot;: &quot;&lt;replace with actual Stripe price ID&gt;&quot;,</span>
<span class="line">    &quot;slotSetting&quot;: false</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">    &quot;name&quot;: &quot;STRIPE_API_KEY&quot;,</span>
<span class="line">    &quot;value&quot;: &quot;&lt;replace with Stripe API key&gt;&quot;,</span>
<span class="line">    &quot;slotSetting&quot;: false</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">    &quot;name&quot;: &quot;WEBHOOK_ENDPOINT_SECRET&quot;,</span>
<span class="line">    &quot;value&quot;: &quot;&lt;replace with Stripe webhook endpoint secret&gt;&quot;,</span>
<span class="line">    &quot;slotSetting&quot;: false</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">    &quot;name&quot;: &quot;WEEKLY_PRICE&quot;,</span>
<span class="line">    &quot;value&quot;: &quot;&lt;replace with actual Stripe price ID&gt;&quot;,</span>
<span class="line">    &quot;slotSetting&quot;: false</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">    &quot;name&quot;: &quot;CHECKOUT_SUCCESS_URL&quot;,</span>
<span class="line">    &quot;value&quot;: &quot;https://&lt;replace with app public domain&gt;&quot;,</span>
<span class="line">    &quot;slotSetting&quot;: false</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">    &quot;name&quot;: &quot;CHECKOUT_CANCEL_URL&quot;,</span>
<span class="line">    &quot;value&quot;: &quot;https://&lt;replace with app public domain&gt;&quot;,</span>
<span class="line">    &quot;slotSetting&quot;: false</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,58)),n("ul",null,[e[9]||(e[9]=t("<li><p>The <code>DATABASE_URL</code> should contain the information for the database you have deployed. Go to the database server that has been created. Find the <strong>Connect</strong> option under <strong>Settings</strong> on the left of the page. This will reveal to you the connection information to the database. The connection string should be configured like this: <code>postgresql://&lt;username&gt;:&lt;password&gt;@&lt;database endpoint&gt;:5432/&lt;database name&gt;</code>. If you forget the password, you can reset it in the database instance, under <code>Security/Authentication</code> and click on <code>Reset password</code>.</p></li>",1)),n("li",null,[n("p",null,[e[1]||(e[1]=a("The ")),e[2]||(e[2]=n("code",null,"CHECKOUT_SUCCESS_URL",-1)),e[3]||(e[3]=a(" and ")),e[4]||(e[4]=n("code",null,"CHECKOUT_CANCEL_URL",-1)),e[5]||(e[5]=a(" should both be set to the public domain of your deployed Safeline instance. They tell Stripe where to send users after successful or canceled payments. Remember to prepend ")),e[6]||(e[6]=n("code",null,"https://",-1)),e[7]||(e[7]=a(". Follow these instructions here to ")),l(s,{to:"/stripe/stripe-setup/stripe-setup.html"},{default:i(()=>e[0]||(e[0]=[a("deploy and setup Safeline")])),_:1}),e[8]||(e[8]=a(" if you haven't done so yet."))])])]),e[25]||(e[25]=n("br",null,null,-1)),e[26]||(e[26]=n("img",{src:k,alt:"Image",style:{display:"block",margin:"auto",width:"80%",height:"auto"}},null,-1)),e[27]||(e[27]=n("br",null,null,-1)),n("ul",null,[n("li",null,[n("p",null,[e[11]||(e[11]=a("Environment variables related to Stripe, namely ")),e[12]||(e[12]=n("code",null,"WEBHOOK_ENDPOINT_SECRET",-1)),e[13]||(e[13]=a(", ")),e[14]||(e[14]=n("code",null,"STRIPE_API_KEY",-1)),e[15]||(e[15]=a(", ")),e[16]||(e[16]=n("code",null,"WEEKLY_PRICE",-1)),e[17]||(e[17]=a(", ")),e[18]||(e[18]=n("code",null,"MONTHLY_PRICE",-1)),e[19]||(e[19]=a(", and ")),e[20]||(e[20]=n("code",null,"ANNUALLY_PRICE",-1)),e[21]||(e[21]=a(" can only be set after you have successfully setup Stripe. You can refer to the relevant ")),l(s,{to:"/deployment/safeline/safeline.html"},{default:i(()=>e[10]||(e[10]=[a("Stripe setup instructions")])),_:1}),e[22]||(e[22]=a(" for instructions on how to set these."))])]),e[23]||(e[23]=n("li",null,[n("p",null,[a("You can access your application via the URL provided by Azure, as shown in the "),n("code",null,"Overview"),a(" page for you web app.")])],-1))]),e[28]||(e[28]=n("br",null,null,-1)),e[29]||(e[29]=n("img",{src:f,alt:"Image",style:{display:"block",margin:"auto",width:"80%",height:"auto"}},null,-1)),e[30]||(e[30]=n("br",null,null,-1))])}const A=o(q,[["render",w],["__file","azure.html.vue"]]),z=JSON.parse('{"path":"/deployment/azure/azure.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Steps to Deploy Your Project Using Docker and Azure","slug":"steps-to-deploy-your-project-using-docker-and-azure","link":"#steps-to-deploy-your-project-using-docker-and-azure","children":[{"level":3,"title":"1. Abstract","slug":"_1-abstract","link":"#_1-abstract","children":[]},{"level":3,"title":"2. Build the Local Docker Image","slug":"_2-build-the-local-docker-image","link":"#_2-build-the-local-docker-image","children":[]},{"level":3,"title":"3. Create Azure Container Registry","slug":"_3-create-azure-container-registry","link":"#_3-create-azure-container-registry","children":[]},{"level":3,"title":"4. Deploy Using Azure App Service","slug":"_4-deploy-using-azure-app-service","link":"#_4-deploy-using-azure-app-service","children":[]},{"level":3,"title":"5. Environment Variables Settings","slug":"_5-environment-variables-settings","link":"#_5-environment-variables-settings","children":[]}]}],"git":{"updatedTime":1731427068000,"contributors":[{"name":"Bryan","email":"zihe2003@uni.sydney.edu.au","commits":3},{"name":"StevenFeng","email":"StevenFeng1020@outlook.com","commits":2},{"name":"hyq-manu","email":"1276502818@qq.com","commits":1}]},"filePathRelative":"deployment/azure/azure.md"}');export{A as comp,z as data};