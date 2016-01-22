$(document).ready(init);

function init(e){
    $('.addButton').on('click', handleEntry);

}

function handleEntry(e){

	e.preventDefault();

	var description = $('#desc').val();
	var myDate = $('#dateInput').val();
	var formattedDate = moment(myDate).format('ll');
	var index;

	var $tr = $('#template').clone().addClass('task');
	$tr.removeAttr('id');
	$tr.children('.desc').text(description);
	$tr.children('.date').text(formattedDate);

	var taskObject = {
		description : description,
		date : myDate,
		status: 'incomplete'
	}

	$.post('/tasks', taskObject)
  .success(function(data) {
  		$('#transactionList').append($tr);

  })
  .fail(function(err) {
    alert('something went wrong :(')
  });
}  