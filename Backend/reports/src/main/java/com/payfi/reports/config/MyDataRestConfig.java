package com.payfi.reports.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
@Order(1)
public class MyDataRestConfig implements RepositoryRestConfigurer {
	
	//private String theAllowedOrigins = "http://localhost:3000";
	
	@Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, //RepositoryRestConfiguration is came here with RepositoryRestConfigurer
                                     CorsRegistry corsRegistry) {
    	//these are the HttpMethods which we do not want to perform on Book, Review, Message externally 
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT};
        
        

        /* Configure CORS Mapping 
        corsRegistry.addMapping("/**") // Apply CORS configuration to all endpoints
        .allowedOrigins(theAllowedOrigins) // Whitelist the allowed origin (replace with your React app's URL)
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
        .allowedHeaders("Authorization", "Content-Type", "Access-Control-Allow-Origin") // Allowed headers
        .allowCredentials(true) // Allow sending credentials such as cookies
        .maxAge(3600); // Cache preflight requests for 3600 seconds (1 hour)
        */
    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions));
    }
}
