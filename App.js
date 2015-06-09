Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
    myStore: undefined,
    myGrid: undefined,
    
    launch: function() {
        console.log("The initial app is launched!!");
        // this._loadData();
        
        this.pullDownContainer = Ext.create('Ext.container.Container', {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
        });
        this.add(this.pullDownContainer);
        this._loadIterComboBox();
    },
    
    _loadIterComboBox: function(){
        this.iterComboBox = Ext.create('Rally.ui.combobox.IterationComboBox', {
            fieldLabel: 'Iteration',
            labelAlign: 'right',
            width: 280,
            listeners: {
                ready: function(combobox){
                    this._loadStates();
                },
                select: function(combobox, records){
                    this._loadData();
                },
                scope: this
            }
        });
        this.pullDownContainer.add(this.iterComboBox);
    },
    
    _loadStates: function(){
        this.statesCombobox = Ext.create('Rally.ui.combobox.FieldValueComboBox', {
            model: 'Task',
            field: 'State',
            fieldLabel: 'State',
            labelAlign: 'right',
            listeners: {
                ready: function(combobox){
                    this._loadData();
                },
                select: function(combobox, records){
                    this._loadData();
                },
                scope: this
            }
        });
        this.pullDownContainer.add(this.statesCombobox);
    },
    
    _loadData: function(){
        var selectedIterationRef = this.iterComboBox.getRecord().get('_ref');
        var selectedStateValue = this.statesCombobox.getRecord().get('value');
        
        var myFilters = [
                {
                    property: 'Iteration',
                    operation: '=',
                    value: selectedIterationRef
                },
                {
                    property: 'State',
                    operation: '=',
                    value: selectedStateValue
                }
            ];
        if(this.myStore){
            this.myStore.setFilter(myFilters);
            this.myStore.load();
        }else{
            
        this.myStore = Ext.create('Rally.data.wsapi.Store', {
            model: 'Task',
            autoLoad: true,
            filters: myFilters,
            listeners: {
                load: function(myStore, myData, success) {
                    if(!this.myGrid)
                        this._createGrid(myStore);
                    console.log("We have a running app! See, look up there ^^");
                },
                scope: this
            },
            fetch: ['FormattedID', 'Name', 'Release', 'Iteration', 'State']
        })
        }
    },
    
    _createGrid: function(gridStore){
        this.myGrid = Ext.create('Rally.ui.grid.Grid', {
            store: gridStore,
            columnCfgs: [
                'FormattedID',
                'Name',
                'Release',
                'Iteration',
                'State'
            ]
        });
        this.add(this.myGrid);
    }
});
