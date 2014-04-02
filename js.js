// you can enter your JS here!

var bigImg = $( '.photos .big_image img' );
bigImg.currentElem = $( '.photos .one_photo.active' );

$( '.photos .one_photo a' ).on( 'click', function( e ){
	e.preventDefault();
	return false;
});

$( '.photos .one_photo' ).on( 'mouseenter mouseup', function(){
	var	preview = $( this ),
		src = preview.find( 'a' ).attr( 'href' );
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