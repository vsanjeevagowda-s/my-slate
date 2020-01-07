import io from 'socket.io-client';
import moment from 'moment';

const SOCKET_PATH = process.env.REACT_APP_SOCKET_PATH;
 
class Socket {
  constructor(){
    console.log('=> Inside the Socket class [constructor] <=');
    this.socket = io(SOCKET_PATH);
    this.registerConnectEvent();
    this.registerDisconnectEvent();
  }

  registerConnectEvent(){
    console.log('Inside the registerConnectEvent');
    this.socket.on('connect', function(){
      console.log('Connected Successfully...')
    });
  }

  registerDisconnectEvent(){
    console.log('Inside the registerDisconnectEvent');
    this.socket.on('disconnect', function(){
      console.log('disconnect Successfully...')
    });
  }

  registerWorkspaceUpdateEvent(fn){
    console.log('Inside the registerWorkspaceUpdateEvent...')
    this.socket.on('update_workspace', function(date){
      console.log('Event called [ update_workspace ]');
      fn(date)
    })
  };

  registerTodoUpdateEvent(fn){
    console.log('Inside the registerTodoUpdateEvent...')
    this.socket.on('update_todo', function(date){
      console.log('Event called [ update_todo ]');
      fn(date)
    })
  };

  workspaceChangeEvent(date){
    console.log('making registerWorkspaceChangeEvent...')
    this.socket.emit('workspace_change', moment(date).format('YYYY-MM-DD'))
  }

  toDoChangeEvent(date){
    console.log('making toDoChangeEvent...')
    this.socket.emit('todo_change', moment(date).format('YYYY-MM-DD'))
  }

  // leaveDateRoom(date){
  //   this.socket.emit('leave_room', date);
  // }

  // joinDateRoom(date){
  //   this.socket.emit('join_room', date);
  // }
}

export default Socket;