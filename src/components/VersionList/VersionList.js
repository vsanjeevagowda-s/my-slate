import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Verison from './Version';
import { API_FAILURE, API_PENDING, API_SUCCESS } from '../../actions/constants';

class VersionList extends Component {

  render() {
    const {
      versions,
      versionRequestStatus,
      hideVersionListModelFn,
      totalVersionCount
    } = this.props;
    return (
      <Modal isOpen toggle={() => hideVersionListModelFn()} className="modal-lg">
        <ModalHeader toggle={() => hideVersionListModelFn()}>Versions ({totalVersionCount})</ModalHeader>
        <ModalBody>
          <div className='version-list'>
            {(versionRequestStatus === API_PENDING) && <center>Loading....</center>}
            {(versionRequestStatus === API_SUCCESS) && <div>
              {versions.map(item => {
                return <Verison
                  key={item.version}
                  item={item} />
              })}
            </div>}
            {(versionRequestStatus === API_FAILURE) && <center>Failure</center>}
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default VersionList;