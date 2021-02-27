
{
	
	let pgui = new PromiseGUI(1);
	
	let $tr = $('#tdR1BC2 table.demo tr');
	tools.prepend(pgui.$td, $tr);
	
	function btnR1BResolved_onclick(btn){
		debugger;
		//pgui.reset();
		pgui.resolved();
	}		
	
	function btnR1BRejected_onclick(btn){
		//pgui.reset();
		pgui.rejected();
	}	
	
	function btnR1BFulfilled_onclick(btn){
		//pgui.reset();
		pgui.fulfilled();
	}
	
	function btnR1BReset_onclick(btn){
		pgui.reset();
	}	
	
	function btnR1BCatched_onclick(btn){
		//pgui.reset();
		pgui.catched();
	}	
	

}