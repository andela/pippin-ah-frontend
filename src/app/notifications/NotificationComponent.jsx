import React from 'react';
import { connect } from 'react-redux';
import { getUserNotification } from './duck';

// eslint-disable-next-line react/prefer-stateless-function
export class NotificationComponent extends React.Component {
  componentDidMount() {
    this.props.getUserNotification();
  }

  render() {
    console.log(this.props.notifications.notification);
    return (
      <div>
        {this.props.notifications.notification ? (
          this.props.notifications.notification.data.map(notifications => {
            const { body, status } = notifications;

            return (
              <div key={body}>
                <span>{status}</span>
                <br />
                <span>{body}</span>
                <br />
              </div>
            );
          })
        ) : (
          <h3>.......</h3>
        )}
      </div>
    );
  }
}

export const mapStateToProps = ({ notifications }) => {
  return { notifications };
};

export default connect(
  mapStateToProps,
  { getUserNotification },
)(NotificationComponent);
