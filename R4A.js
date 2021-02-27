

// Some function used in this section will be used in other section.
// This is one of the possible way to share them between sessions.
let R4A = {};


{
	let n = 5;
		
	// the array with the progress bars & the PromiseGUI
	let pbs   = [];
	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		
		pbs[i] = new ProgressBar('ProgressBar' + i);	

		pbs[i].resolvePercent = 90;
		pbs[i].errorPercent   =  0;
		//pbs[i].isSynchronous  = true;
		
		tools.append2Demo(pbs[i], 'tdR4AC2');

		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);			
	}
	
	// The 'Promise' that 'controls' all the other 'Promises'
	let pguiAll = new PromiseGUI(n);
	tools.prepend(pguiAll.$td, pbs[0].$tr);
	
	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //	
	// The callbacks used by the 'Promise.all'
		
	R4A.resolve = function(pguiAll, folders, btn){		
		try{

			folders.forEach((folder) => {
				folder.pgui.resolved();
				folder.pgui.fulfilled();
			});

			pguiAll.resolved();
			tools.highlight.resolved(btn);
		}
		catch(jse){
			// this catch stops the chaining of the error to the function 'R4A-catch'
			window.console.promise.log.catch(jse);
		}
		
	}	

	// The first progressBar that reject, stops the 'race'
	R4A.reject = function(pguiAll, folder, btn){
		try{	
			folder.pgui.rejected();
			folder.pgui.fulfilled();
			pguiAll.rejected();
			window.console.promise.log.reject(folder.result.id);

			// As soon a 'ProgressBar' rejects, The 'PromiseAll' stops listening the other 'Promise'
			// That means, this stop is an option. It is up to developer write it, based on what he/she 
			// needs to do.
			tools.stop(pbs);
			tools.highlight.rejected(btn);			
		}
		catch(jse){
			window.console.promise.log.catch(jse);
		}		
	}	
	
	R4A.finally = function(pguiAll, btn){
		window.console.promise.log.finally();			
		tools.enableBtns(btn);
		pguiAll.fulfilled();
	}	

	R4A.catch = function(error, pguiAll){
		window.console.promise.log.catch(error);			
	}
	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	
	function btnR4AAll_onclick(btn){	
		debugger;	
		
		console.clear();
		tools.disableBtns(btn);
		tools.highlight.clear(btn);
		tools.reset(pguis);
		pguiAll.reset();		
		
		let promises = [];
		
		for(let i = 0; i < pbs.length; i++){
			
			// closure needs to be managed in that way, in a 'for loop'			
			let pb   = pbs[i];			
			let pgui = pguis[i];			
			
			
			// every promise is configurated to manage its own 'ProgressBar'
			promises[i] = new Promise(function(resolve, reject) {
				
				try{
					
					let _resolve = function(result){ 
						let folder = {result: result, pgui: pgui};	
						resolve(folder);
					}

					let _reject = function(result){ 
						let folder = {result: result, pgui: pgui};		
						reject(folder);
					}
					
					pb.start(_resolve, _reject);
				}
				catch(jse){
					window.console.promise.log.catch(jse);
						
					let rejectionResult = pb.getRejectionResult(jse);
					let folder = {result: rejectionResult, pgui: pgui};	
						
					// this ensures '_reject' will always receive the correct 
					// type parameter, and all the info it needs.
					reject(folder);
				}
			})
		}
		
				
		
		// The new promise does not controls the 'ProgressBar', instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Now we have 2 levels of 'Promise': it's a little bit more complex, but the concepts
		// are all the same!
		let promiseAll = Promise.all(promises);
		
		// and now we can use the 'promise' in the way we learned 
		promiseAll.then(
			folder => R4A.resolve(pguiAll, folder), 
			folder => R4A.reject (pguiAll, folder)
		)
		.finally(()    => R4A.finally(pguiAll, btn))
		.catch((error) => R4A.catch  (error, pguiAll));
	
	}
}