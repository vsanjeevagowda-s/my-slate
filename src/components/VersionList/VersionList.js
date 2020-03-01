import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Verison from './Version';
import { API_FAILURE, API_PENDING, API_SUCCESS } from '../../actions/constants';

class VersionList extends Component {

  render() {
    const {
      versions,
      versionRequestStatus,
      hideVersionListModelFn
    } = this.props;
    return (
      <Modal isOpen toggle={() => hideVersionListModelFn()} className="modal-lg">
        <ModalHeader toggle={() => hideVersionListModelFn()}>Versions ({versions.length})</ModalHeader>
        <ModalBody>
          {(versionRequestStatus === API_PENDING) && <div>Pending....</div>}
          {(versionRequestStatus === API_SUCCESS) && <div>
            {versions.map(item => {
              return <Verison
                key={item.version}
                item={item} />
            })}
          </div>}
          {(versionRequestStatus === API_FAILURE) && <div>Failure</div>}
        </ModalBody>
      </Modal>
    );
  }
}

export default VersionList;