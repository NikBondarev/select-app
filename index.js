
import { Select } from "./select/select";
import './select/styles.scss'
const select = new Select('#select', {
    placeholder: 'choose element',
    selectedId: '5',
    data : [
        {id:'1', value:'React'},
        {id:'2', value:'Angular'},
        {id:'3', value:'Vue'},
        {id:'4', value:'Node'},
        {id:'5', value:'React Native'},
        {id:'6', value:'Next'},
        {id:'6', value:'Nest'}
    ]
})