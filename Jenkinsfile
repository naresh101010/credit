node {  
  stage('SCM Checkout usermodule_ui'){  
    git branch: "${env.BRANCH}",credentialsId: 'jenkins-codecommit', url: "${env.GITURL_CREDIT_CONTRACT_UI}"  
  } 
  def commitSha = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    println("commitSha: ${commitSha}")
    sh "sed -i 's/credit-contract-ui:BUILDNUMBER/dev:credit-contract-ui_${BUILD_NUMBER}_${commitSha}/' $WORKSPACE/k8s-config.yaml"
  stage('build source'){ 
      sh 'cp package*.json ./src/app/'  
      sh 'npm install'  
      sh 'npm run build  --output-path=./dist'  
  }
  stage('build docker image'){  
     sh label: '', script: "docker build -t 183454673550.dkr.ecr.ap-south-1.amazonaws.com/dev:credit-contract-ui_${BUILD_NUMBER}_${commitSha} ."
  }  
  stage('push ECR_Dev'){  
     withDockerRegistry(credentialsId: 'ecr:ap-south-1:Jenkins-ECR', url: 'https://183454673550.dkr.ecr.ap-south-1.amazonaws.com/dev') {  
            sh "docker push 183454673550.dkr.ecr.ap-south-1.amazonaws.com/dev:credit-contract-ui_${BUILD_NUMBER}_${commitSha}"  
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
      sh "sed -i 's/internal-ade22be1927c711ea9bac0a3257c4306-803686038.ap-south-1.elb.amazonaws.com/internal-a6a08c80c308711eaa69b0a7ef785cff-527668279.ap-south-1.elb.amazonaws.com/' $WORKSPACE/src/app/app.setting.ts" 
      sh 'cp package*.json ./src/app/'  
      sh 'npm install'  
      sh 'npm run build  --output-path=./dist'  
  }
   stage('docker image test'){   
   sh "sed -i 's/dev/qa/' $WORKSPACE/k8s-config.yaml"
   sh label: '', script: "docker build -t 183454673550.dkr.ecr.ap-south-1.amazonaws.com/qa:credit-contract-ui_${BUILD_NUMBER}_${commitSha} ."
  } 
  stage('push ECR_Test'){  
     withDockerRegistry(credentialsId: 'ecr:ap-south-1:Jenkins-ECR', url: 'https://183454673550.dkr.ecr.ap-south-1.amazonaws.com/qa') {  
            sh "docker push 183454673550.dkr.ecr.ap-south-1.amazonaws.com/qa:credit-contract-ui_${BUILD_NUMBER}_${commitSha}"  
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