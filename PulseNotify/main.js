class PulseNotify {
  static notifications = [];
  static maxNotifications = 5;

  static Notify(title, message, options = {}) {
    const {
      type = 'info', // info, success, error, warning
      duration = 5000,
      position = 'bottom-right'
    } = options;

    // Remove oldest notification if we reached max
    if (this.notifications.length >= this.maxNotifications) {
      const oldest = this.notifications.shift();
      this.animateOut(oldest, true);
    }

    // Create container
    const container = document.createElement('div');
    container.className = 'pulse-notification';
    
    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'pulse-notification-content';
    
    // Create title element
    const titleElement = document.createElement('div');
    titleElement.className = 'pulse-notification-title';
    titleElement.textContent = title;
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'pulse-notification-message';
    messageElement.textContent = message;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'pulse-notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
      this.removeNotification(container);
    });
    
    // Assemble the notification
    contentWrapper.appendChild(titleElement);
    contentWrapper.appendChild(messageElement);
    container.appendChild(contentWrapper);
    container.appendChild(closeBtn);
    
    // Add to DOM
    document.body.appendChild(container);
    
    // Apply styles
    container.classList.add(`pulse-notification-${type}`);
    container.classList.add(`pulse-notification-${position}`);
    
    // Add to notifications array
    this.notifications.push(container);
    this.updatePositions();
    
    // Animate in
    this.animateIn(container);
    
    // Auto-hide after duration
    let hideTimeout = setTimeout(() => {
      this.removeNotification(container);
    }, duration);
    
    // Pause hide on hover
    container.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout);
    });
    
    container.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        this.removeNotification(container);
      }, duration);
    });
  }

  static animateIn(container) {
    setTimeout(() => {
      container.style.transform = 'translateX(0)';
      container.style.opacity = '1';
    }, 10);
  }

  static animateOut(container, isOldest = false) {
    if (!container) return;
    
    if (isOldest) {
      // Slide out to right for oldest notification
      container.style.transform = 'translateX(120%)';
    } else {
      // Fade out for others
      container.style.opacity = '0';
    }
    
    setTimeout(() => {
      container.remove();
      this.notifications = this.notifications.filter(n => n !== container);
      this.updatePositions();
    }, 300);
  }

  static removeNotification(container) {
    this.animateOut(container);
  }

  static updatePositions() {
    const bottomMargin = 24;
    const notificationHeight = 90; // Approximate height including margin
    
    this.notifications.forEach((notification, index) => {
      const offset = (this.notifications.length - 1 - index) * notificationHeight;
      notification.style.bottom = `${bottomMargin + offset}px`;
      
      // Smooth transition for moving notifications
      notification.style.transition = 'transform 0.3s ease, opacity 0.3s ease, bottom 0.3s ease';
    });
  }
}

// Add styles to the head
const style = document.createElement('style');
style.textContent = `
.pulse-notification {
  position: fixed;
  z-index: 9999;
  min-width: 300px;
  max-width: 400px;
  padding: 18px 24px;
  border-radius: 12px;
  color: white;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transform: translateX(120%);
  opacity: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(40, 40, 40, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  right: 24px;
  bottom: 24px;
  transition: transform 0.3s ease, opacity 0.3s ease, bottom 0.3s ease;
}

.pulse-notification-content {
  flex-grow: 1;
  padding-right: 12px;
}

.pulse-notification-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 1.3;
}

.pulse-notification-message {
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.9;
}

.pulse-notification-info {
  border-left: 4px solid rgba(33, 150, 243, 0.9);
}

.pulse-notification-success {
  border-left: 4px solid rgba(76, 175, 80, 0.9);
}

.pulse-notification-error {
  border-left: 4px solid rgba(244, 67, 54, 0.9);
}

.pulse-notification-warning {
  border-left: 4px solid rgba(255, 193, 7, 0.9);
  color: #fff;
}

.pulse-notification-warning .pulse-notification-message {
  opacity: 0.8;
}

.pulse-notification-close {
  background: transparent;
  border: none;
  // made by PulseExternal
  color: white;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.7;
  padding: 0;
  align-self: flex-start;
  transition: all 0.2s ease;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.pulse-notification-close:hover {
  opacity: 1;
  background: rgba(244, 67, 54, 0.9);
  transform: scale(1.1);
}
`;
document.head.appendChild(style);

window.PulseNotify = PulseNotify;
