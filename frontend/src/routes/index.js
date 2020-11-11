import React from 'react';
import { Switch } from 'react-router-dom';
import Car from '~/pages/Car';
import CarWash from '~/pages/CarWash';
import CarWashReserve from '~/pages/CarWashReserve';
import ChangeStatusReserve from '~/pages/CarWashReserve/ChangeStatusReserve';
import CreateCar from '~/pages/CreateCar';
import CreateCarWash from '~/pages/CreateCarWash';
import MyReserve from '~/pages/MyReserve';
import Profile from '~/pages/Profile';
import Reserve from '~/pages/Reserve';
import CreateReserve from '~/pages/Reserve/CreateReserve';
import MakeReserve from '~/pages/Reserve/MakeReserve';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />

      <Route path="/reserve" component={Reserve} isPrivate />
      <Route path="/reservecreate" component={CreateReserve} isPrivate />
      <Route path="/reservemake/:id" component={MakeReserve} isPrivate />

      <Route path="/createcarwash" component={CreateCarWash} isPrivate />

      <Route path="/createcar" component={CreateCar} isPrivate />

      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/car" component={Car} isPrivate />

      <Route path="/carwash" component={CarWash} isPrivate />

      <Route path="/myreserve" component={MyReserve} isPrivate />

      <Route path="/carwashreserve" component={CarWashReserve} isPrivate />
      <Route
        path="/changestatusreserve/:id"
        component={ChangeStatusReserve}
        isPrivate
      />
    </Switch>
  );
}
