
function Inbox(){this.initialize.apply(this, arguments)};
(function(Class){
	var inboxPage = 1;
	var isInboxFin = false;
	
	Class.first = function() {
		inboxPage = 1;
		isInboxFin = false;
		Folders.getInbox().clearTicket();
		inbox();
	}
	Class.next = function() {
		if (isInboxFin) return;
		inboxPage++ ;
		inbox();
	}


	function inbox() {
		var opts = {page:inboxPage};

		// Control のフィルタ条件設定
		var query = Control.getCustomQuery();
		opts.project_id = Control.getProjectId();
		opts.assigned_to_id = Control.getFilterUser();
		opts.status_id = Control.getFilterClosed();
		Control.getFilterMasters(opts);
		
		// ソート条件
		var sortInfo = TicketTray.getSortInfo();
		if (sortInfo) {
			opts.sort = sortInfo.name + (sortInfo.desc?":desc":"");
		}

		new RedMine().getIssues(function(resData){
			var issues = resData.issues;
			var inbox = Folders.getInbox();
			for (var i=0; i<issues.length; i++) {
				var issue = issues[i];
				TicketPool.put(issue);
				inbox.addTicket(issue.id);
				MasterTable.register(issue);
			}
			Folders.select(inbox);
			isInboxFin = (issues.length==0);
			
			Control.initMasterTable();//TODO:このタイミング？
		}, query, opts);
	}


})(Inbox);

