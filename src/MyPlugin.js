/**
 * Plugin comments
 */
(function($, undefined){
	var MyPlugin = function(element, options){
		
		/*
		 * *************************** Variables ***************************
		 */
		var defaults = {
			defaultValue : '2'
		}; //default options
		
		/*
		 * *************************** Plugin Functions ***************************
		 */
		
		/*
		 * Initializes plugin.
		 */
		function initialize(options){
			extendOptions(options);
			sl.log("Got Options- initialize: ");
			sl.log(options);
		}
		
		/*
		 * Updates plugin.
		 */
		function update(options){
			sl.log("Got Options- update: ");
			sl.log(options);
		}
		
		/*
		 * Destroy plugin changes
		 */
		function destroy(options){
			// Remove all added classes.
			// Remove all bound methods.
			
			// Remove plugin data
			$.removeData(element, 'myplugin');
		}
		
		/*
		 * Updates plugin options after plugin has been initialized.
		 */
		function setOptions(options){
			extendOptions(options);
		}
		
		//expose plugin functions
		this.initialize = initialize;
		this.update = update;
		this.destroy = destroy;
		this.setOptions = setOptions;
		
		/*
		 * *************************** Utility Methods ***************************
		 */
		/*
		 * Extend the default options using the passed options.
		 */
		function extendOptions(options){
			if (options) {
				$.extend(true, defaults, options);
			}
		}
	};
	
	var mP = $.myPlugin = {version: "0.01"};
	$.fn.myPlugin = function(options){
		var args = arguments; // full argument array passed to the plugin.
		
		// Available methods in plugin
		var pMethods = {
			init : function(options){
				// Get the plugin data
				if (this.data('myplugin')) return;
				// Initialize the plugin
				var myplugin = new MyPlugin(this, options);
				// Add plugin data to the element
				this.data('myplugin', myplugin);
				myplugin.initialize(options);
			},
			update : function(options){
				// Get the plugin data
				var myplugin = this.data('myplugin');
				if (!myplugin) return; // do nothing if plugin is not instantiated.

				myplugin.update(options);
			},
			destroy : function(options){
				// Get the plugin data
				var myplugin = this.data('myplugin');
				if (!myplugin) return; // do nothing if plugin is not instantiated.
				
				// destroy data and revert all plguin changes.
				myplugin.destroy(options);
			},
			setOptions : function(options){
				// Get the plugin data
				var myplugin = this.data('myplugin');
				if (!myplugin) return; // do nothing if plugin is not instantiated.
				
				// Update the plugin options
				myplugin.setOptions(options);
			}
		};
		
		// For each element, check and invoke appropriate method passing the options object
		return this.each(function(i, tElement){
			var element = $(tElement);
			
			if (pMethods[options]){
				pMethods[options].call(element, args[1]);
			} else if (typeof options === 'object' || !options){
				pMethods['init'].call(element, args[0]);
			} else {
				$.error( 'Method ' +  options + ' does not exist in jQuery.myplugin' );
			}
		});
	};
})(jQuery);