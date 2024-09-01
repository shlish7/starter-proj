import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashCan, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faInbox, faFile } from '@fortawesome/free-solid-svg-icons'
import gmailLogo from '../assets/imgs/gmailLogo.png'


export default function EmailFolderList({ filterBy, onFilterBy, emailFolders,unreadEmailsCount, }) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  
  // console.log('unreadEmailsCount: ', unreadEmailsCount)
  useEffect(() => {
    onFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function onChooseFolder({ target }) {
    const { value, name, textContent } = target
        console.log("target.dataset.folder: ", target.dataset.folder)

    if (target.dataset.folder) {
      const folderName = target.dataset.folder.toLowerCase().trim();
      setFilterByToEdit((prev) => ({ ...prev, status: folderName }));
    }
    onFolderChange(folderName)

  }



  return (
    <section className="email-folder-list-section">
      {/* <img src={gmailLogo} alt="" className="gmail-logo"/> */}

      <ul className='folder-list-ul'>
        {
          emailFolders.map((folder, idx) => {

            return <li className={`folder-li ${filterBy.status === folder.name.toLowerCase() ? 'active' : ''}`}  key={idx} onClick={onChooseFolder}>
            {/* return <li className="folder-li" key={idx} onClick={onChooseFolder}> */}
              <FontAwesomeIcon icon={folder.icon} className="folder-icons" />
              <h4  data-folder={folder.name}
                className={`folder-name ${filterBy.status === folder.name.toLowerCase() ? 'active' : ''}`}              
                >
                  {folder.name}</h4>
                  {folder.name.toLowerCase() === 'inbox' && (
                <h4>{unreadEmailsCount}</h4>
              )}

            </li>
          })
        }
      </ul>
    </section>
  )

}

