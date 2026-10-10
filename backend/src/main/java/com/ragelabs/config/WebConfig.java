package com.ragelabs.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/about").setViewName("forward:/about.html");
        registry.addViewController("/services").setViewName("forward:/services.html");
        registry.addViewController("/portfolio").setViewName("forward:/portfolio.html");
        registry.addViewController("/careers").setViewName("forward:/careers.html");
        registry.addViewController("/contact").setViewName("forward:/contact.html");
        
        // Primary clean URL routes
        registry.addViewController("/work").setViewName("forward:/see-what-we-do.html");
        registry.addViewController("/insights").setViewName("forward:/what-we-think.html");
        
        // Alias / Legacy mappings
        registry.addViewController("/see-what-we-do").setViewName("forward:/see-what-we-do.html");
        registry.addViewController("/what-we-think").setViewName("forward:/what-we-think.html");
        registry.addViewController("/capabilities").setViewName("forward:/see-what-we-do.html");
        registry.addViewController("/s").setViewName("forward:/see-what-we-do.html");
        
        registry.addViewController("/apply").setViewName("forward:/apply.html");
        registry.addViewController("/build-project").setViewName("forward:/build-project.html");
        registry.addViewController("/dashboard").setViewName("forward:/dashboard.html");
        registry.addViewController("/home").setViewName("forward:/index.html");
        registry.addViewController("/pitch").setViewName("forward:/pitch.html");
        registry.addViewController("/thankyou").setViewName("forward:/thankyou.html");
        registry.addViewController("/track").setViewName("forward:/track.html");
    }
}