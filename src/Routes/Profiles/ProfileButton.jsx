import * as React from 'react'

import { Modal, ModalBody, ModalHeader } from "../../Components/Atoms";

import {ProfileComponent} from './index'

const ProfileButton = ({
                           user,
                                            }) => {

    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            {user &&
            <div>
                <div className="flex items-center" onClick={()=> {setShowModal(true)}}>
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {user.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                            {user.userName || "N/A"}
                        </div>
                    </div>
                </div>

                <Modal
                    className="bg-white rounded-lg w-3/4 overflow-auto"
                    isOpen={showModal}
                    toggle={()=> {setShowModal(false)}}
                >
                    <ModalHeader toggle={()=> {setShowModal(false)}}>
                        Profile
                    </ModalHeader>
                    <ModalBody>
                        <ProfileComponent user={user} />
                    </ModalBody>
                </Modal>
            </div>}
        </>
    );
};

export default ProfileButton;