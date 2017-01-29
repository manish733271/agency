import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealonScroll {
    constructor(element, offset){
        this.itemstoReveal = element;
        this.offsetPercentage = offset;
        // this.itemstoReveal = $(".feature-item, .testimonial");
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially(){
        this.itemstoReveal.addClass("manipulate-item-on-scroll");
    }

    createWaypoints(){
        var that = this;
        this.itemstoReveal.each(function(){
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function() {
                    $(currentItem).addClass("manipulate-item-on-scroll--is-visible");
                },
                offset: that.offsetPercentage
            });
        });
    }

}

export default RevealonScroll;