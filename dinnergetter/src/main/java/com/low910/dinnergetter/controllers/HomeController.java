package com.low910.dinnergetter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    

    @GetMapping("/")
    private String index() {
        return "index.jsp";
    }
}
