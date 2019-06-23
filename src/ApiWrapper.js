import React, { Component } from 'react';
import App from './App';
import localforage from "localforage"
import { resolve } from 'path';
const members = [{
    id: "dummy_id",
    imageUrl: "https://graph.facebook.com/10155273988510318/picture?type=large",
    image: "https://graph.facebook.com/10155273988510318/picture?type=large",
    locations: [
        {
            city:"Singapore",
            id:"dummy_id"
        }
    ],
    name: "Shishir Choudhary",
    publicProfileUrl: "/user/Shishir/dbjpb"
},
{
    id: "dummy_id2",
    image: "https://lh6.googleusercontent.com/-xeUwo8u61aI/AAAAAAAAAAI/AAAAAAAAMoA/-_TU3EM8E5Y/s96-c/photo.jpg",
    imageUrl: "https://lh6.googleusercontent.com/-xeUwo8u61aI/AAAAAAAAAAI/AAAAAAAAMoA/-_TU3EM8E5Y/s96-c/photo.jpg",
    locations: [
        {
            city:"Delhi",
            id:"dummy_id"
        }
    ],
    name: "Admin Joe",
    publicProfileUrl: "/user/Shishir"
},
{
    id: "dummy_id3",
    imageUrl: "https://image.flaticon.com/icons/svg/145/145866.svg",
    image: "https://image.flaticon.com/icons/svg/145/145866.svg",
    locations: [
        {
            city:"London",
            id:"dummy_id"
        }
    ],
    name: "User Joe",
    publicProfileUrl: "/user/Shishir"
}

]

class ApiWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0, user:members[2]};
    }
    componentWillMount(){
        localforage.getItem("data").then(res=>{
            if(res){
                let data = res
                this.setState({data})
            }
        })

    }
    componentDidMount(){
        window.React = React;
        this.setState({
            pluginsData: this.props.pluginData,
            plugin_id: 'plugin_id'
            // pluginsData : this.props.pluginData.filter(plugin_data => this.props.plugins[0].id == plugin_data.pluginId),
            // plugins: [this.props.plugins[0]]
        })
       
    }

    updateDb(payload){
        return new Promise((resolve, reject)=>{
            let dbData = payload;
        if(dbData){
            let data  = {
                pluginId: 'plugin_id',
                dbData: dbData,
                userDataFileName: 'dummy_db',
                id: "plugins_data_id",
                userFeedId: "userfeed_id"
            }
            return localforage.setItem("data", payload).then(res=>{
                console.log(res)
                this.setState({data : payload})
                return resolve("Successfully Updated")
            }).catch(err=>{
                console.log(err)
                return reject(new Error("Incorrect Json Format"))
            })
        }
        })
        // let props = this.props;
        
      }

    
    //   loadPlugins() {
    //     if(this.state.active_plugin){
    //     let active_plugin = []
    //     this.props.plugins.map(plugin=> {
    //         if(plugin.id  === this.state.active_plugin){
    //             active_plugin.push(plugin)
    //         }
    //     })
    //     console.log(active_plugin, "gere")
    //     fetch(active_plugin[0].pluginUrl)
    //     .then((resp) =>resp.text())
    //         .then((resp)=>{
    //             this.state.components = [];
    //             this.state.components.push('plugin');
    //             this.pluginRegistry['plugin'] =  eval(resp).default;
    //             this.setState({count: this.state.count+ 1});
    //         }).catch(error=>{
    //             console.log(error)
    //             this.setState({error: true})
    //             this.forceUpdate();
    //         })
    //     }
    // }
    
        componentDidCatch(error, info) {
            // You can also log the error to an error reporting service
            this.setState({error: error})
          }

        // setActive(id){
        //     this.setState({active_plugin : id, plugins: this.props.plugins.filter(plugin  => plugin.id === id), pluginsData: this.state.allPluginsData.filter(plugin_data => id === plugin_data.pluginId)}, ()=>{
        //         this.loadPlugins()
        //     })
            
        // }
    

    render() {
            return (
                <div>
                {this.state.error ?
                    <div className='mb-l p-xs text-center' style={{  fontFamily: 'averta-bold',color: 'rgba(0,0,0,.15)', fontSize:'1.5rem'}}>
                        Plugin failed to load
                        <br/>
                        <span style={{fontSize:'0.7rem'}}>{this.state.error.message}</span>
                    </div>
                :
                <App admin={true} 
                     user={this.state.user}
                     members={members.filter(user=>user.id !== this.state.user.id)}
                     plugin_id={this.state.plugins_id}
                     count={this.state.count}
                     pluginsData={this.state.data}
                     updateDb={(payload)=>this.updateDb(payload)} />
                }
                </div>
        );
    }
}

export default ApiWrapper;