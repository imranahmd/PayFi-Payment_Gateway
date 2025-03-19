package com.payfi.apigateway.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cloud.gateway.route.RouteDefinitionLocator;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import springfox.documentation.swagger.web.SwaggerResource;
import springfox.documentation.swagger.web.SwaggerResourcesProvider;

@Configuration
@Primary
public class SwaggerConfig implements SwaggerResourcesProvider {

	public static final String API_URI = "/v3/api-docs";
	private final RouteDefinitionLocator routeLocator;

	public SwaggerConfig(RouteDefinitionLocator routeLocator) {
		this.routeLocator = routeLocator;
	}

	private SwaggerResource swaggerResource(String name, String location) {
		SwaggerResource swaggerResource = new SwaggerResource();
		swaggerResource.setName(name);
		swaggerResource.setLocation(location);
		swaggerResource.setSwaggerVersion("1.0");
		return swaggerResource;
	}

	@Override
	public List<SwaggerResource> get() {
		
		List<SwaggerResource> resources = new ArrayList<>();
		  
		System.out.println(routeLocator+ "lalit route locator ************************************************************");
		
		routeLocator.getRouteDefinitions().subscribe(routeDefinition -> {
			String resourceName = routeDefinition.getId();
			String location = routeDefinition.getPredicates().get(0).getArgs().get("_genkey_0").replace("/**", API_URI);
			resources.add(swaggerResource(resourceName, location));

		});
		/*
		routeLocator.getRouteDefinitions().subscribe(routeDefinition -> {
			String resourceName = routeDefinition.getId();
			System.out.println(routeDefinition.getId()+ "lalit id locator ************************************************************");
			String location = routeDefinition.getPredicates().get(1).getArgs().get("_genkey_0");
			System.out.println(routeDefinition.getPredicates().get(1).getArgs().get("_genkey_0")+ "lalit predicates locator ************************************************************");
			resources.add(swaggerResource(resourceName, location));

		});
        */
		return resources;
	}
	
}
