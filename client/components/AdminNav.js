import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function AdminPage({user}) {
  return(
    <div>
      <h2>Hello {user.firstName}</h2>
      {
        <ul>
          <li><Link to='/admin/users'>View All Users</Link></li>
          <li><Link to='/admin/orders'>View All Orders</Link></li>
          <li><Link to='/admin/products'>View All Products</Link></li>
        </ul>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminPage);