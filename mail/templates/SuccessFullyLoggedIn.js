exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Course Registration Confirmation</title>
      <style>
        body {
          background-color: burlywood;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }
  
        .container {
          max-width: 600px;
          margin: 189px auto;
          padding: 20px;
          text-align: center;
          background-color: aquamarine;
          border-radius: 27px;
        }
  
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
  
        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
  
          height: 44px;
        }
  
        .body {
          font-size: 16px;
          margin-bottom: 20px;
        }
  
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ffd60a;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
  
        .support {
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
        }
  
        .highlight {
          font-weight: bold;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app"
          ><img class="logo" src="logo.png" alt="Build Logo"
        /></a>
        <div class="message"><h3>Workers Registration Confirmation</h3></div>
        <div class="body">
          <p>Dear ${name},</p>
          <p>
            You have successfully registered this worker
            <span class="highlight">"${courseName}"</span>.
          </p>
          <p>
            Please log in to your learning dashboard to access the course
            materials and start your learning journey.
          </p>
          <a
            class="cta"
            href="https://studynotion-edtech-project.vercel.app/dashboard"
            >Go to Dashboard</a
          >
        </div>
        <div class="support">
          If you have any questions or need assistance, please feel free to reach
          out to us at
          <a href="mailto:adityat1531@gmail.com">adityat1531@gmail.com</a>. We are
          here to help!
        </div>
      </div>
    </body>
  </html>
  `;
};
