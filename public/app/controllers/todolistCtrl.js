angular.module('todolistCtrl',[])
	.directive('todolist', function(){
		return {
			restrict: 'E',
			replace: true,
			template: '<div class="todolist"><input id="task" type="text" placeholder="Add a task..."><br><br><div id ="lines"></div><br><button id="add" class="btn btn-dark btn-lg">Add Task</button></div>'

		}
	})
	.controller('todolistController', function(){
		console.log('to do controller...');
		function getList() {
			var list = new Array;
			var list_str = localStorage.getItem('todo');
			if(list_str != null) {
				list = JSON.parse(list_str);
			}
			return list;
		}

		function addTask() {
			var task = document.getElementById('task').value;
			var list = getList();
			list.push(task);
			localStorage.setItem('todo', JSON.stringify(list));
			displayList();
			document.getElementById('task').value = '';
			return false;

		}

		function removeTask() {
			var id = this.getAttribute('id');
			var list = getList();
			list.splice(id, 1);
			localStorage.setItem('todo', JSON.stringify(list));
			displayList();
			return false;
				
		}

		function displayList() {
			var list = getList();
			var html = '<ul class="unorderedlist">';
			for (var i=0; i<list.length; i++) {
				html += '<li class="unorderedlist-tem">' + list[i] + '<span style="float:right;"><button class="remove" type="submit" id="' + i  + '">x</button></span></li>';
			};
			html += '</ul></div>';
			document.getElementById('lines').innerHTML = html;

			var buttons = document.getElementsByClassName('remove');
		    	for (var i=0; i < buttons.length; i++) {
		        	buttons[i].addEventListener('click', removeTask);
		    	};
			

		}
		document.getElementById('add').addEventListener('click', addTask);
		displayList();
	});