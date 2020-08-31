## This is a test project where I trying to build(mimicking) a small microservice frontend


| service ENDPOINT      | available HTTP method | description                                            |
| --------------------- | --------------------- | ------------------------------------------------------ |
| http://localhost:4000 | GET/POST              | post service: get all posts and create a post          |
| http://localhost:4001 | GET/POST              | comment service: get all comments and create a comment |
| http://localhost:4002 | GET/POST              | query service: combine post and comment data           |
| http://localhost:4003 | POST                  | moderation service: watch 'commentCreated' event       |
| http://localhost:4005 | GET/POST              | eventbus service: watch event and dispatch event       |
| http://localhost:3000 | -                     | frontend                                               |


## What is kubernetes?


![](https://i.imgur.com/SILk78d.jpg)


Kubernetes enable you to use the cluster as if it is signle PC. You don’t need to care the detail of the infrastructure. Just declare the what you want in yaml file, you will get what you want.

- When you use Kubernetes, you can use kubectl command to control the kubernetes cluster
- If you want to orchestrate the container in Kubernetes, you can use yaml file
- A pod is a group of one or more containers (such as Docker containers), with shared storage/network, and a specification for how to run the containers
- A Deployment controller provides declarative updates for Pods and ReplicaSets
- A Kubernetes Service is an abstraction which defines a logical set of Pods and a policy by which to access them - sometimes called a micro-service
- Kubernetes Pods are mortal. They are born and when they die, they are not resurrected. If you use a Deployment to run your app, it can create and destroy Pods dynamically
- Each Pod gets its own IP address, however, in a Deployment, the set of Pods running in one moment in time could be different from the set of Pods running that application a moment later

This leads to a problem: if some set of Pods (call them “backends”) provides functionality to other Pods (call them “frontends”) inside your cluster, how do the frontends find out and keep track of which IP address to connect to, so that the frontend can use the backend part of the workload? Here come **Services**


![](https://i.imgur.com/Rup9o7f.jpg)

Kubernetes has several Master nodes and Worker nodes. Your containers work on Worker nodes. Worker nodes scales.
Once you deploy kubernetes resources using Yaml file with kubectl command, it send Post request to the API server. The API server store the data into [ectd](https://github.com/etcd-io/etcd)(is a distributed reliable key-value store for the most critical data of a distributed system), which is the distributed key value store. Other resources like Controller Manager, Scheduler, observe the change state of the API server. When you create a `some.yaml` file with a deployment then `kubectl create -f some.yaml` It send the yaml data to the API Server. It create a Deployment object on the API Server. Deployment controller detect the change of the deployment, it create ReplicaSet object on the API Server. The Replica Set Controller detect the change then according to the number of replica, create Pod objects. The Scheduler, that is in charge of the pod resource allocation, commnd the kubelet, which reside on every worker nodes, execute docker command and create containers. Every worker nodes have a kube proxy to control the routing. For example, If you create a service object on the API Server, Endpoint Controller create an Endpoint object on the API Server. Kube Proxy watch the API server Endpoint state, then configure iptable to route the endpoint to the container.


![](https://i.imgur.com/5rtOHPQ.png)


## Things I learnt via this project 

### `fetch` usecase:

```js
function getUser(name){
 fetch(`http://localhost:4002/posts`)
//   .then(function(response) {
//     return response.json();
//   })
  .then(function(data) {
    console.log(data);
  });
};
getUser()
```

### `Promise.allSettled(promises)`

### axios concurrent mode

[Details](https://www.pluralsight.com/guides/all-need-to-know-about-axios)

### Kubernetes Dashboard

- [doc link](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/#deploying-the-dashboard-ui)

### Updating the image used by a deployment

- The deployment must be using the 'latest' tag in the pod spec
- Make an update to your code 
- Build the image 
- Push the image to docker hub
- Run `kubectl rollout restart deployment <deployment_name>`

### To make connection with different pods/deployments

- Create a service
- Change API endpoint for container as they are pod/deployment now (http://<s>localhost</s>*service_name*:port)

### remaining Issues to fix

- <s>when event bus got error at axios.post() then it haunt the process that why comment is not moderated after the query server alive</s>
- need refresh to fetch updated data in react application