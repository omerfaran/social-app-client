import { Modal, Segment, TransitionablePortal } from "semantic-ui-react";
import classes from "./AboutModal.module.css";

const AboutModal = ({ modalClose, showModal }) => {
  return (
    <TransitionablePortal
      open={showModal}
      transition={{ animation: "scale", duration: 350 }}
    >
      <Modal
        size="small"
        //   open={newMessageModal}
        open={true}
        onClose={modalClose}
        closeIcon
        closeOnDimmerClick
      >
        <Modal.Header content="Welcome" />
        <Modal.Content>
          <div>
            <div className={classes.title}>
              <h2>No time to fiddle around? Watch the short presentation!</h2>
            </div>
            <div className={classes.youtubeContainer}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/439pP_kn76w"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <hr />
            <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
              App written in: React, Next.js, Node.js, and Semantic UI React
            </p>
          </div>
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  );
};

export default AboutModal;
