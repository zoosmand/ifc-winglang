# Infrastructure from Code. Winglang tutorial based on Asher Sterkin report.

Asher and I were working together in Blackswan Technologies on CAIOS (Cloud AI Operating System). Asher as an ideologist of CAIOS knows all problems very deeply of IfC, while I as his follower, may produce errors and I am sure, I do. Consider this text as a first impression from Wing from my side.

### Here is my report based on the article by Asher Sterkin about Wing cloud language.

<https://itnext.io/hello-winglang-hexagon-6f2bdb550f37>

<https://asher-sterkin.medium.com/aws-mapu-65e888009916>


First of all, I would like to commend Asher for his excellent work. I consider his article, which he refers to as a "report," as a valuable tutorial for the initial steps towards understanding Wing as a technology and Infrastructure from Code (IfC) in general.

Before delving into the code, I took precautions to configure my AWS access in a way that would prevent any harm to my existing infrastructure. It's always wise to consider such measures as a safety net. <https://github.com/zoosmand/ifc-winglang/aws-security.md>

While attempting to replicate all the steps outlined in Asher's article, I found the first five steps to be quite straightforward and could be skipped to start directly from step 6. <(https://github.com/zoosmand/ifc-winglang/tree/step-6)>

Step 7 <https://github.com/zoosmand/ifc-winglang/tree/step-7> is particularly crucial as it marks the separation of business logic from the core/system one. This allows core developers to continue using Wing language while others may opt for the more convenient TypeScript or ES6.

The subsequent steps in the article highlight the evolution of understanding the necessity of dividing different components within a system. Asher introduces several mapping structures that are well-received and appreciated.

In general, Wing language serves as an excellent example of IfC technology, showcasing how certain parts of it can be implemented. However, it may appear to be more of a mental exercise rather than practical due to various reasons.

#### Complexity
 It is a significant factor to consider. IfC demands a deep level of knowledge from newcomers, while Wing requires specific expertise such as understanding REST APIs, HTTP protocols, and API Gateways. Asher emphasizes the distinction between business logic and core logic development in step 7, but the reality may not be as straightforward, especially in complex systems.

#### Scalability 
This is another critical aspect. Horizontal scalability, akin to a collective effort in a coal mine, may work efficiently in theory, but practical implementation requires meticulous control over all aspects of the application. Vertical scalability poses its own challenges, raising questions about the size of functions, cross-platform compatibility, and environmental variations.

#### Language
JavaScript, being a pre-compiled language, necessitates a runtime environment for execution. While it may suit serverless functions, deploying applications involves additional steps like fetching images, copying code from S3 buckets, and running them. Alternatives like Go lang, which compile into binaries, could offer better performance and flexibility, especially in containerized environments.

#### Debugger 
Debugging support is crucial for development, yet Wing lacks an online debugger. Implementing a debugger in Kubernetes could be a viable solution, albeit debugging large bundle 26k lines files poses a challenge.

#### Resource management
This is vital for operational efficiency. Adopting Wing as the primary development tool requires addressing security, trust, monitoring, and control issues. Ensuring seamless onboarding for new team members, optimizing resource consumption, and having a robust disaster recovery plan are essential considerations for sustainable operations.


In conclusion, while I believe in the potential of IfC, my perspective on its implementation differs from the approach taken by Wing.


### Resources

<https://www.winglang.io/docs/>

<https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept>
