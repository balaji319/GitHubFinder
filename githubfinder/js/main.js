$(document).ready(function(){
	$('#searchuser').on('keyup',function(e){
		let username = e.target.value;
   //Make Ajex Request
  
        if(username!='')
        {
			$.ajax({
	         url:'https://api.github.com/users/'+username,
	         datatype:'GET',
	         data:{
	         	client_id:'9172750912b702cdd9a9',
	         	client_Secret:'1ee5f7d9f7cc9d8bc96e4b49f7efc3c7d887ce1c'
	         },
	          beforeSend: function() {
			        // setting a timeout
			         $("#loader-icon").show();
			    },	
			}).done(function(user){
				$('.profile').show();
				$.ajax({
				  url:'https://api.github.com/users/'+username+'/repos',
				  data:{
		         	client_id:'9172750912b702cdd9a9',
		         	client_Secret:'1ee5f7d9f7cc9d8bc96e4b49f7efc3c7d887ce1c'
		         }


				}).done(function(repos){
	               $.each(repos , function(index , repos){
	                   $('#repos').append('<div class="well"><div class="row"><div class="col-md-7">'+ repos.name+'</div><div class="col-md-3"><span class="label label-primary">Forks:'+ repos.forks_count  + ' </span><span class="label label-success">Watchers : '+ repos.watchers_count  + ' </span><span class="label label-info">Stars : '+ repos.stargazers_count +'</span></div><div class="col-md-2"><a href="'+ repos.html_url +'" class="btn btn-primary" target="_blank" >Repo Page</a></div></div></div>')
	               });
				});
				   $("#loader-icon").hide();
				if(user.name!=null)
				{
					$('.profile').html('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+user.name+'</h3></div><div class="panel-body"><div class="row"><div class="col-md-3"><img  class="thumbnail Avatar" src="'+ user.avatar_url + '" ><a href="'+ user.html_url  +'" class="btn btn-primary btn-block" target="_blank">View Profile</a></div><div class="col-md-9"><span class="label label-default">public_repos:'+ user.public_repos +  ' </span><span class="label label-primary"> public Gists:'+ user.public_gists  + ' </span><span class="label label-success">Followers : '+ user.followers  + ' </span><span class="label label-info">Follweings : '+ user.following +'</span><br><br><ul class="list-group"><li class="list-group-item">Company: ' + user.company + '</li><li class="list-group-item">websit/blog : '+ user.blog +' </li><li class="list-group-item">Location : '+ user.location +'</li><li class="list-group-item">Member Since : '+ user.created_at +'</li></ul></div></div></div><h3 class="page-header">Lastest Repos</h3><div id="repos"></div>'
						);
		
				}else{
				$('.profile').html("no recod found");
		}
			
		});
		}
		else
		{
			$('.profile').hide();
		}
	});
});
















