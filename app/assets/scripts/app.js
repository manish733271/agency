import MobileMenu from './modules/MobileMenu';
import RevealonScroll from './modules/RevealonScroll';
import $ from 'jquery';

var mobileMenu = new MobileMenu();

// var revealonScroll = new RevealonScroll();

//for feature items 
new RevealonScroll($(".feature-item"), "85%");

//for testimonial
new RevealonScroll($(".testimonial"), "60%");



