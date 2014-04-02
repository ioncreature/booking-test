// NOTICE: I don't want to spend a lot of time
// and will try to write minimal amount of source code.
// Thus you don't find here sophisticated libraries or MVC frameworks.


// Slideshow
( function( $ ){
    var bigImg = $( '.photos .big_image img' );
    bigImg.currentElem = $( '.photos .one_photo.active' );

    $( '.photos .one_photo a' ).on( 'click', function( e ){
        e.preventDefault();
        return false;
    });

    $( '.photos .one_photo' ).on( 'mouseenter mouseup', function(){
        var preview = $( this ), src = preview.find( 'a' ).attr( 'href' );
        bigImg.attr( 'src', src );
        bigImg.currentElem = preview;
        preview.siblings().removeClass( 'active' );
        preview.addClass( 'active' );
    });

    $( '.photos .button_next' ).on( 'click', function(){
        var next = bigImg.currentElem && bigImg.currentElem.next();
        if ( next )
            next.trigger( 'mouseenter' );
    });

    $( '.photos .button_prev' ).on( 'click', function(){
        var next = bigImg.currentElem && bigImg.currentElem.prev();
        if ( next )
            next.trigger( 'mouseenter' );
    });
})( jQuery );


// Sortable table
( function( $ ){
    var tbody = document.querySelector( '.rooms .rooms_table tbody' ),
        nameEl = document.querySelector( '.rooms thead .room_name' ),
        priceEl = document.querySelector( '.rooms thead .room_price' ),
        occupancyEl = document.querySelector( '.rooms thead .room_occupancy' );

    new SortableColumn( nameEl );
    new SortableColumn( priceEl, 'money' );
    new SortableColumn( occupancyEl );

    function SortableColumn( elem, sortType ){
        var column = this;
        column.order = 1;
        column.index = [].indexOf.call( elem.parentNode.children, elem );
        column.sortType = sortType;

        $( elem ).on( 'click', function(){
            var list = [].concat.apply( [], tbody.children );
            list.sort( function( row1, row2 ){
                return column.sort( column.getValue(row1), column.getValue( row2 ) );
            });
            list.forEach( tbody.removeChild.bind(tbody) );
            list.forEach( tbody.appendChild.bind(tbody) );
            column.order *= -1;
        });
    }

    SortableColumn.prototype.getValue = function( row ){
        return row.children[this.index].innerHTML;
    };

    SortableColumn.prototype.sort = function( a, b ){
        return this.sortType === 'money'
            ? this.moneySort( a, b )
            : this.defaultSort( a, b );
    };

    SortableColumn.prototype.moneySort = function( a, b ){
        return this.order * ( Number(a.replace(/\D/, '')) - Number(b.replace(/\D/, '')) );
    };

    SortableColumn.prototype.defaultSort = function( a, b ){
        return this.order * ( a > b ? 1 : -1 );
    };
})( jQuery );