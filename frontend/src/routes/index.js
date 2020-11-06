import React from 'react';
import { Switch } from 'react-router-dom';
import CreateCarWash from '~/pages/CreateCarWash';
import CreateCar from '~/pages/CreateCar';
import Reserve from '~/pages/Reserve';
import CreateReserve from '~/pages/Reserve/CreateReserve';
import MakeReserve from '~/pages/Reserve/MakeReserve';
import Profile from '~/pages/Profile';
import Car from '~/pages/Car';
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
    </Switch>
  );
}
