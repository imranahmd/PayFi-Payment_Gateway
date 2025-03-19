package com.payfi.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {
	
	@Bean
	RouteLocator getwayRouter(RouteLocatorBuilder routeLocatorBuilder) {
		
		RouteLocator routeLocator = routeLocatorBuilder.routes()
				                    .route("MERCHANT", r -> r.path("/merchants/**")
				                    		                 .uri("lb://MERCHANT"))
				                    .route("TRANSACTION", r -> r.path("/transactions/**")
                   		                 .uri("lb://TRANSACTION"))
				                    .route("ADMIN", r -> r.path("/admins/**")
                   		                 .uri("lb://ADMIN"))
				                    .route("RECURRING", r -> r.path("/recurrings/**")
                   		                 .uri("lb://RECURRING"))
				                    .route("REPORTS", r -> r.path("/reports/**")
                   		                 .uri("lb://REPORTS"))
				                    .build();
				                    
		return routeLocator;
	}

}
