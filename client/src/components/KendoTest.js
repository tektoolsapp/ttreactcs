
import React from 'react';
import ReactDOM from 'react-dom';
//import '../DarkTotally.css';
import '../variables.scss';
import "@progress/kendo-theme-default/dist/all.scss";
//import '@progress/kendo-theme-default/dist/all.css';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
//import "@progress/kendo-theme-default/scss/grid/_index.scss";
//import Buttons from '@progress/kendo-react-buttons';

    // ES2015 module syntax
import { Button, ButtonGroup, DropDownButton, DropDownButtonItem,
        SplitButton, SplitButtonItem, Toolbar, ToolbarItem } from '@progress/kendo-react-buttons';
  
//$theme-type: dark;
import sampleProducts from '../products.json';

console.log("DATA: ", sampleProducts)

function editCell(value){

    alert("EDIT: " + JSON.stringify(value))

}

class CustomCell extends React.Component {

    render() {
        
        const value = this.props.dataItem;
        return (
        <Button defaultChecked={true} onClick={() => editCell(value)}>Edit</Button>
        );
    }
}

class KendoTest extends React.Component {
    
    state = {
        data: sampleProducts
    }
    customData = [
        { color: 'green' },
        { color: 'red' }
    ];

    MyCustomCell = (props) => <CustomCell {...props} myProp={this.customData} />
    
    render() {
        return (
            <Grid data={this.state.data}   >
                <GridColumn field="ProductID" title="Id" width="50px" editable={false} />
                <GridColumn field="ProductName" title="Product Name" />
                <GridColumn field="FirstOrderedOn" editor="date" format="{0:d}" />
                <GridColumn field="UnitsInStock" title="Units" editor="numeric" />
                <GridColumn
                    field="CategoryID"
                    title="Action"
                    cell={this.MyCustomCell}
                />
            </Grid>
        );
    }
}

export default KendoTest



