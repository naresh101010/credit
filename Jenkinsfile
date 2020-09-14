node {  
  stage('SCM Checkout micro_frontend_main'){  
    git branch: 'dev_master',credentialsId: 'jenkins-codecommit', url: 'https://git-codecommit.ap-south-1.amazonaws.com/v1/repos/micro_frontend_main'  
  } 
  def commitSha = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    println("commitSha: ${commitSha}")
    sh "sed -i 's/micro-frontend-main1:stage_BUILDNUMBER/dev:micro-frontend-main_${BUILD_NUMBER}_${commitSha}/' $WORKSPACE/k8s-config.yaml"
stage('build source'){
  } 
  stage('sonar'){
    sh 'sonar-scanner   -Dsonar.projectKey=micro_frontend_main   -Dsonar.sources=.'
  }
 stage('build docker image'){  
     sh label: '', script: "docker build -t 183454673550.dkr.ecr.ap-south-1.amazonaws.com/dev:micro-frontend-main_${BUILD_NUMBER}_${commitSha} ."  
  }
    stage("docker_scan"){
      sh "clair-scanner --ip=10.41.11.179 183454673550.dkr.ecr.ap-south-1.amazonaws.com/dev:micro-frontend-main_${BUILD_NUMBER}_${commitSha}"
    }
  stage('push ECR_Dev'){  
     withDockerRegistry(credentialsId: 'ecr:ap-south-1:Jenkins-ECR', url: 'https://183454673550.dkr.ecr.ap-south-1.amazonaws.com/dev') {  
            sh "docker push 183454673550.dkr.ecr.ap-south-1.amazonaws.com/dev:micro-frontend-main_${BUILD_NUMBER}_${commitSha}"  
         }  
    }  
   stage('dev'){  
        sh "kubectl apply -f $WORKSPACE/k8s-config.yaml"
    }
    stage('Email notification') { 
    mail from: 'devops@safexpress.com', 
      to: 'devops@safexpress.com', 
      subject: "Approval", 
      body: "Check dev eks cluster if all ok then deploy into test eks" 
    } 
   stage('Deployment approval'){ 
    input "dev to ECR_QA?" 
   } 
   stage('build source'){
       sh "sed -i 's/internal-a4442250f27aa11ea9bac0a3257c4306-879971059.ap-south-1.elb.amazonaws.com/internal-a83758738306a11eaa69b0a7ef785cff-1040806451.ap-south-1.elb.amazonaws.com/' $WORKSPACE/data.json"
     sh "sed -i 's/internal-af19f2c033c4111ea9bac0a3257c4306-911222744.ap-south-1.elb.amazonaws.com/internal-a9f66b275426d11eaa69b0a7ef785cff-1320506385.ap-south-1.elb.amazonaws.com/' $WORKSPACE/data.json"
      sh "sed -i 's/internal-a9bdbf3ac6ebb11eaa19a023e3146bec-1444555109.ap-south-1.elb.amazonaws.com/internal-aa12661f4306c11eaa69b0a7ef785cff-1032147424.ap-south-1.elb.amazonaws.com/' $WORKSPACE/app_path.json"
       sh "sed -i 's/a28e04fcb28d511ea9bac0a3257c4306-d3a8152ca9c78d33.elb.ap-south-1.amazonaws.com/aefac83713c3211eaa69b0a7ef785cff-4e4214388dc0b5ec.elb.ap-south-1.amazonaws.com/' $WORKSPACE/app_path.json"
       sh "sed -i 's/internal-a39fbf0736a8c11eaa19a023e3146bec-409216876.ap-south-1.elb.amazonaws.com/internal-a8e791f3183c011eaa5570a3b3567cf4-1620608796.ap-south-1.elb.amazonaws.com/' $WORKSPACE/app_path.json"
       sh "sed -i 's/internal-ae8d29162733311eaa19a023e3146bec-1551517571.ap-south-1.elb.amazonaws.com/internal-aa172110578b611eaa5570a3b3567cf4-1152888199.ap-south-1.elb.amazonaws.com/' $WORKSPACE/app_path.json"
      //mdm
       sh "sed -i 's/internal-aa18f5df64d5e11ea9bac0a3257c4306-287532085.ap-south-1.elb.amazonaws.com/internal-a29f5885953d611eaa69b0a7ef785cff-504577613.ap-south-1.elb.amazonaws.com/' $WORKSPACE/data.json"
      sh "sed -i 's/internal-a0e01a3894c0811ea9bac0a3257c4306-2035179949.ap-south-1.elb.amazonaws.com/internal-a7be5d0b953d411eaa69b0a7ef785cff-1271528180.ap-south-1.elb.amazonaws.com/' $WORKSPACE/data.json"
       sh "sed -i 's/internal-a8b998f554e6611ea9bac0a3257c4306-1036323921.ap-south-1.elb.amazonaws.com/internal-aa588b8c7553311eaa69b0a7ef785cff-1092390762.ap-south-1.elb.amazonaws.com/'  $WORKSPACE/data.json"
       sh "sed -i 's/internal-a0db0192d644a11eaa19a023e3146bec-1307889661.ap-south-1.elb.amazonaws.com/internal-a29d42f80863611eaa5570a3b3567cf4-2041192687.ap-south-1.elb.amazonaws.com/' $WORKSPACE/data.json"
       sh "sed -i 's/internal-acb12892e52e311ea9bac0a3257c4306-550481844.ap-south-1.elb.amazonaws.com/internal-a1c842016553511eaa69b0a7ef785cff-2011380587.ap-south-1.elb.amazonaws.com/' $WORKSPACE/data.json"
       sh "sed -i 's/internal-ade22be1927c711ea9bac0a3257c4306-803686038.ap-south-1.elb.amazonaws.com/internal-a6a08c80c308711eaa69b0a7ef785cff-527668279.ap-south-1.elb.amazonaws.com/' $WORKSPACE/data.json"
  } 
    stage('build docker image'){  
     sh "sed -i 's/dev/qa/' $WORKSPACE/k8s-config.yaml"
     sh label: '', script: "docker build -t 183454673550.dkr.ecr.ap-south-1.amazonaws.com/qa:micro-frontend-main_${BUILD_NUMBER}_${commitSha} ."  
  }  
  stage('push ECR_qa'){  
     withDockerRegistry(credentialsId: 'ecr:ap-south-1:Jenkins-ECR', url: 'https://183454673550.dkr.ecr.ap-south-1.amazonaws.com/qa') {  
            sh "docker push 183454673550.dkr.ecr.ap-south-1.amazonaws.com/qa:micro-frontend-main_${BUILD_NUMBER}_${commitSha}"  
         }  
    }  
   stage('test'){   
        sh '''  
        export KUBECONFIG=/var/lib/jenkins/.kube/test-config 
        ECR_PASSWORD=$(aws --profile ECR ecr get-login | awk '{print $6}')  
        kubectl delete secret aws-ecr --ignore-not-found=true  
        kubectl create secret docker-registry aws-ecr --docker-server="https://183454673550.dkr.ecr.ap-south-1.amazonaws.com" --docker-username="AWS" --docker-password="${ECR_PASSWORD}" 
        kubectl apply -f $WORKSPACE/k8s-config.yaml 
        '''  
    } 
}