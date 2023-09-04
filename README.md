# Devcard
DevCard is the go-to platform for developers to create professional business cards that showcase their skills and expertise. Our user-friendly platform allows you to get cards that reflect your brand and communicate your value proposition. Join us today to elevate your professional image and succeed in your career!

## Made with
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## [Demo](https://www.youtube.com/watch?v=zkAAkazL9Jk)

## Functionalities
1. Sign In (Sign not possible without email verification) / Sign Up
2. JWT authentication
3. Forgot password
4. Gmail integration
5. Verify email
6. Contact us / Feedback form
7. Update email
8. Download user data
9. Demo
10. Crop image for demo
11. Update password
12. Delete account
13. Image delivery using Cloudfront CDN
14. Cloudfront image invalidation.
15. Cloudfront signed URL
16. Storing objects on S3
17. Update image
18. Update personal / professional information

## API endpoints
```
auth/register
auth/login
auth/logout

public/demo
public/feeback_contact
public/verify_email
public/forgot_password

user/account
user/profile
user/personal
user/professional
```

## Environmental variables
These environmental variables are for backend code:
```
FLASK_APP -  (Main file name with extension which will run the whole application)
FLASK_DEBUG - True (optional)
FLASK_RUN_PORT - Port on which the server will run
AWS_KEY - AWS KEY for boto3 (must have access to the Bucket and CloudFront)
AWS_SECRET - AWS SECRET for boto3 (must have access to the Bucket and CloudFront)
BUCKET - AWS bucket name
MAIL_SERVER - Mail server URL
MAIL_PORT - Email server port
MAIL_USERNAME - Email address
MAIL_PASSWORD - email application password
JWT_SECRET_KEY - JWT token secret key
JWT_ACCESS_TOKEN_EXPIRES - JWT enpiry time in seconds
CLOUDFRONT_DISTRIBUTION_ID - Cloudfront distribution ID
CLOUDFRONT_URL - Cloudfront URL
CLOUDFRONT_KEY_ID - Cloudfront Key ID which stores the public RSA key
CLOUDFRONT_RSA_KEY - Private RSA key for signing cloudfront URLs 
HOST_URL - URL of your frontend
```

## AWS Setup
1. Create a bucket for storing object
2. Create a CDN which must have access to the bucket created above
3. Create public and private keys.
4. Create AWS KEY and AWS SECRET for boto3 SDK

## NOTE
I attempted to create this website as a part of my learning experience with React and Flask. Unfortunately, due to some recent changes in my circumstances, I haven't been able to fully complete the project. I am now seeking someone who would be interested in taking over this project, and I would be more than happy to offer my assistance and guidance to ensure its successful continuation.
   
<p align="center" style="text"><strong>If you liked something about this repository, do give it a 🌟. It will motivate me come up with more such project. You can reach out to me on my social media given below.</strong></p>

<p align="center">
 <a href="https://twitter.com/aps08__"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"></a>
 <a href="https://medium.com/@aps08"><img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white"></a>
 <a href="https://www.linkedin.com/in/aps08"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
 <a href="https://github.com/aps08"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
 <a href="https://www.youtube.com/channel/UC8biJQnoqm1s2FZ8LK90baA"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"></a>
 <a href="mailto:anoopprsingh@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
 <a href="https://t.me/aps080"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white"></a>
</p>
