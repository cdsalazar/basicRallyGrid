Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        console.log("The initial app is launched!!");
        this._loadData();
        console.log("We have a running app!");
    },
    
    _loadData: function(){
        var myStore = Ext.create('Rally.data.wsapi.Store', {
        model: 'User Story',
        autoLoad: true,
        listeners: {
            load: function(myStore, myData, success) {
                myGrid = this._loadGrid(myStore);
                console.log("grid: ", myGrid);
                this.add(myGrid);
            },
            scope: this
        },
        fetch: ['FormattedID', 'Name', 'ScheduleState']
    });
    },
    
    _loadGrid: function(gridStore){
        var myGrid = Ext.create('Rally.ui.grid.Grid', {
            store: gridStore,
            columnCfgs: [
                'FormattedID',
                'Name',
                'ScheduleState'
            ]
        });
        return myGrid;
    }
});
