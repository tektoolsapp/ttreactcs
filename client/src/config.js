const dev = {
    
    API_VERSION: "v2",
    API_KEY: "qwvkwyejd9yqun8jp8gp2dym",
    API_SECRET: "sMJAWXkGyXVVFpgB4aW9yXSB",
    REDIRECT_URL: "https://ttreact.com.au/auth",
    SCOPE: "CompanyFile",
    API_URL: "https://api.myob.com/accountright/",
    API_COMPANY_FILE: "8f9f3d03-4a60-421d-88e9-f1287205e4fe",
    API_COY_UN: "TekTools",
    API_COY_PW: "tektools01"

  };
  
  const prod = {
    
    API_VERSION: "v2",
    API_KEY: "qwvkwyejd9yqun8jp8gp2dym",
    API_SECRET: "sMJAWXkGyXVVFpgB4aW9yXSB",
    REDIRECT_URL: "https://ttreact.com.au/auth",
    SCOPE: "CompanyFile",
    API_URL: "https://api.myob.com/accountright/",
    API_COMPANY_FILE: "8f9f3d03-4a60-421d-88e9-f1287205e4fe",
    API_COY_UN: "TekTools",
    API_COY_PW: "tektools01"

  };
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };
  