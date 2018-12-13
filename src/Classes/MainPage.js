import React, {Component} from 'react';
import {Featured,SingleFeature} from './Featured';
import {Welcome} from './Welcome';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Clients} from './Clients';

import "react-tabs/style/react-tabs.css";

export class MainPage extends Component{
    render(){
        return <div>
                    <Welcome/>
          
          <Tabs>
          <TabList>
          <Tab>
          <div><i className="fa fa-hotel fa-3x"></i></div>
            Hotels
            </Tab>
            <Tab>
            <div><i className="fas fa-utensils fa-3x"></i></div>

              Restaurants
              
            </Tab>
            <Tab>
            <div><i className="fa fa-spa fa-3x"></i></div>
      Spa</Tab>
            <Tab>
            <div><i className="fa fa-film fa-3x"></i></div>
      Cinema</Tab>
          </TabList>

          <TabPanel>
          <Featured/>
        
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 4</h2>
          </TabPanel>
        </Tabs>
        <Clients/>
            </div>
    }

}