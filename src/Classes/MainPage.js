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
                <div><i className="fa fa-hotel fa-2x"></i></div>
                <b> Hotels</b>
            </Tab>
            <Tab>
                <div><i className="fas fa-utensils fa-2x"></i></div>
                <b>Restaurants</b>
            </Tab>
            <Tab>
                <div><i className="fa fa-film fa-2x"></i></div>
                <b>Cinemas</b>
            </Tab>
            <Tab>
            <div><i className="fa fa-spa fa-2x"></i></div>
            <b> Spa</b></Tab>
          </TabList>

          <TabPanel>
            <Featured cat="Hotels"/>
          </TabPanel>
          <TabPanel>
            <Featured  cat="Restaurant"/>
          </TabPanel>
          <TabPanel>
            <Featured  cat="Cinemas"/>
          </TabPanel>
          <TabPanel>
            <Featured  cat="Spa"/>
          </TabPanel>
        </Tabs>
        <Clients/>
            </div>
    }

}