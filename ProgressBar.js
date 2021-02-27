

	function ProgressBar(id){

		// https://ponyfoo.com/articles/es6-promises-in-depth

		var _this = this;
		
		let _html = '<tr><td><div class="progressBar" id="" title="" ><div class ="bar" style=""><span></span></div></div></td></tr>';

		var _iterations =  0;
		
		this.id = id;		
		
		this.isSynchronous  = false;
		
		this.interval       = 15;
		
		// The probability an internal synchronous error occurs.
		// (an error in 'start()' but not in 'bar()') 
		this.errorPercent   =  0; 
		
		// The probability this process resolves.
		this.resolvePercent = 60;
		
		this.$tr          = $(_html)
		this.$progressBar = this.$tr.find('div.progressBar').attr('id', id).attr('title', id);
		var _$bar         = this.$progressBar.find('div.bar');
		let _$span        = _$bar.find('span');	

		
		var _catched = function(){_this.$progressBar.addClass("error");};
		var _width   = function(value){_$bar.width(value + '%');};
		var _color   = function(value){_$bar.css('background-color', value);};
		var _text    = function(value){_$span.text(value);};	
		
		let _intervalId = 0;
		let _isStopped  = false;
		this.stop       = function(){clearInterval(_intervalId);_isStop = true;};
		this.catched    = function(){};
		this.fulfilled  = function(){};
		this.rejected   = function(){};
		this.resolved   = function(){};

		
		this.reset = function(){						
			_this.stop();
			_iterations = 0;
			_isStopped  = false;
			_width(0);
			_text('');
			_this.$progressBar.removeClass("error");
			_color('#DDDDDD');
		}


		// this is a 'factory' method' 
		// NOTE: this 'result' isn't the same type of the result for the 'resolve' function (calback).
		// (in the session 2 and 3 will be clear why the need of a public factory method.)
		this.getRejectionResult = function(_error){

				let result = {};

				
				result.id =  _this.id;

				// the error occurred (if any).
				result.error =  _error;

				return result;
			};
		
		
		// ----------------------------------------------------------------------------------- //
		// this function was made to work with 'Promise'.
		// When 'Promise' calls this function, privides two calbacks: 'resolve' and 'reject'
		// The only think 'Promise' expects from this function is that ONE AND ONLY ONE of 
		// the two calbacks is called.
		// Any of the callback can be called passing any value you like:
		// resolve(whatYouWant) xor reject(whatYouWant)
		// If an uncaught exception occurs, 'Promise' take this as if reject(error) was called.
		//
		// This function should be protected by a 'try-catch' session. It is not, only because 
		// this a 'case study'.
		// ----------------------------------------------------------------------------------- //

		
		this.start = function(resolve, reject){
					
			_this.reset();	

			
			if(_this.errorPercent > (100 * Math.random())){
				// Here stands the reason because this function isn't protected by 'try-catch':
				// I want this function can have uncaught exceptions (it is for test).
				throw new Error("Synchronous error thrown randomly to test the application.");
			}	


			try{

				
				resolve = resolve || (() => {});
				reject = reject || (() => {});

				// ============================================================ //
				let _resolve = function(){ 
					_this.stop();
					_color('#52BE80');

					// anything that matter. (this is the result of the function 'start'. The reason why 'start' exists.)
					let _result =  { id: _this.id };

					resolve(_result);
				};

				let _reject = function(_error){
					_this.stop();
					_color('#ff4d4d');

					// anything. (what the application needed to react to a rejection.)
					let _result =  _this.getRejectionResult( _error = _error );
					reject(_result); 
				}

				let _timeout = function (){
					_text('timeout');
					let _error = new Error("Timeout");
					_reject(_error);
				}
				
				
				let _error = function (jse){	
					_this.stop();	
					_color('transparent');	
					_catched();			
					let _result =  _this.getRejectionResult( _error = jse );
					reject(_result);	
				}				

				// ============================================================= //
				let alea = 1 + Math.floor(99 * Math.random());
			
				let isResolve = (alea < _this.resolvePercent);
				
				let modulus = alea % 3;
				
				// ---------------------------------------------------- //
				// only one of these can be true at the same time! ---- //				
				let isReject  = !isResolve && (modulus == 0);
				let isTimeout = !isResolve && (modulus == 1);
				let isError   = !isResolve && (modulus == 2);
				// ---------------------------------------------------- //
				
				let maxIterations = isTimeout ? 100 : alea;
				// ============================================================= //

    			_width(++_iterations);
				
				if(_this.isSynchronous){
					for(let i = 1; i <= maxIterations; i++){

						let jMax = (10000000 * Math.random());

						for(let j = 0; j <= jMax; j++){	};
						
						iteration();
					};					
				}
				else{
					_intervalId = window.setInterval(
						iteration, 
						_this.interval
					);
				}				
				
				
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
				// The 'unit of time' is each iteration of function 'iteration' operated by 'setInterval'. (see Section 6A)
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

						
				function iteration(){
					try{
						if(_iterations >= maxIterations){

							if(false){}
							else if( isResolve ){ _resolve(); }
							else if( isReject  ){ _reject(); }
							else if( isTimeout ){ _timeout(); }
							else{
								throw new Error("Asynchronous error, thrown randomly to test the application."); 
								// This function is asynchronous, thus any exception is silent. This 'throw' is
								// here to create one of the possible events during the running of any function
							}
						}
						else{
							_width(++_iterations);
						}
					}
					catch(jse){
						window.console.log(jse);
						_error(jse);
					}
				}
								
			}
			catch(jse){
				//window.console.log(jse);
				let _result =  _this.getRejectionResult( _error = jse );
				reject(_result);
			}
		}
	}