import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import Typing from "./Typing";
import Skeleton from "./Skeleton";

import { connect } from "react-redux";
import { setUserPosts } from "../../actions";

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    privateMessagesRef: firebase.database().ref("privateMessages"),
    usersRef: firebase.database().ref("users"),
    typingRef: firebase.database().ref("typing"),
    connectedRef: firebase.database().ref(".info/connected"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messages: [],
    messagesLoading: true,
    progressBar: false,
    numUniqueUsers: "",
    searchTerm: "",
    searchLoading: false,
    searchResults: [],
    privateChannel: this.props.isPrivateChannel,
    isChannelStarred: false,
    typingUsers: [],
    listners: [],
  };
  componentDidMount() {
    const { channel, user, listners } = this.state;
    if (channel && user) {
      this.removeListners(listners);
      this.addListners(channel.id);
      this.addUserStarsListner(channel.id, user.uid);
    }
  }
  componentWillUnmount() {
    this.removeListners(this.state.listners);
    this.state.connectedRef.off();
  }
  removeListners = (listners) => {
    listners.forEach((listner) => {
      listner.ref.child(listner.id).off(listner.event);
    });
  };
  addToListners = (id, ref, event) => {
    const index = this.state.listners.findIndex((listner) => {
      return (
        listner.id === id && listner.ref === ref && listner.event === event
      );
    });
    if (index === -1) {
      const newListner = { id, ref, event };
      this.setState({ listners: this.state.listners.concat(newListner) });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.messagesEnd) {
      this.scrollToBottom();
    }
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  addListners = (channelId) => {
    this.addMessageListner(channelId);
    this.addTypingListners(channelId);
  };

  addMessageListner = (channelId) => {
    let loadedMessages = [];
    const ref = this.getMessagesRef();
    ref.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false,
      });
      this.countUniqueUsers(loadedMessages);
      this.countUserPosts(loadedMessages);
    });
    this.addToListners(channelId, ref, "child_added");
  };

  addTypingListners = (channelId) => {
    let typingUsers = [];
    this.state.typingRef.child(channelId).on("child_added", (snap) => {
      if (snap.key !== this.state.user.uid) {
        typingUsers = typingUsers.concat({
          id: snap.key,
          name: snap.val(),
        });
        this.setState({ typingUsers });
      }
    });
    this.addToListners(channelId, this.state.typingRef, "child_added");
    this.state.typingRef.child(channelId).on("child_removed", (snap) => {
      const index = typingUsers.findIndex((user) => user.id === snap.key);
      if (index !== -1) {
        typingUsers = typingUsers.filter((user) => user.id !== snap.key);
        this.setState({ typingUsers });
      }
    });
    this.addToListners(channelId, this.state.typingRef, "child_removed");

    this.state.connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.state.typingRef
          .child(channelId)
          .child(this.state.user.uid)
          .onDisconnect()
          .remove((err) => {
            if (err !== null) {
              console.error(err);
            }
          });
      }
    });
  };

  addUserStarsListner = (channelId, userId) => {
    this.state.usersRef
      .child(userId)
      .child("starred")
      .once("value")
      .then((data) => {
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val());
          const prevStarred = channelIds.includes(channelId);
          this.setState({ isChannelStarred: prevStarred });
        }
      });
  };

  getMessagesRef = () => {
    const { messagesRef, privateMessagesRef, privateChannel } = this.state;
    return privateChannel ? privateMessagesRef : messagesRef;
  };

  handleSearchChange = (event) => {
    const { value } = event.target;
    this.setState(
      {
        searchTerm: value,
        searchLoading: true,
      },
      () => this.handleSearchMessages()
    );
  };
  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => {
      this.setState({ searchLoading: false });
    }, 1000);
  };

  countUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.setState({ numUniqueUsers });
  };

  countUserPosts = (messages) => {
    let userPosts = messages.reduce((acc, message) => {
      if (message.user.name in acc) {
        acc[message.user.name].count += 1;
      } else {
        acc[message.user.name] = {
          avatar: message.user.avatar,
          count: 1,
        };
      }
      return acc;
    }, {});
    // console.log(userPosts);
    this.props.setUserPosts(userPosts);
  };

  displayMessages = (messages, user) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message key={message.timeStamp} message={message} user={user} />
    ));

  displayChannelName = (channel) => {
    return channel
      ? `${this.state.privateChannel ? "@" : "#"}${channel.name}`
      : "";
  };

  handleStar = () => {
    this.setState(
      (prevState) => ({
        isChannelStarred: !prevState.isChannelStarred,
      }),
      () => this.starChannel()
    );
  };
  starChannel = () => {
    if (this.state.isChannelStarred) {
      this.state.usersRef.child(`${this.state.user.uid}/starred`).update({
        [this.state.channel.id]: {
          name: this.state.channel.name,
          details: this.state.channel.details,
          createdBy: {
            name: this.state.channel.createdBy.name,
            avatar: this.state.channel.createdBy.avatar,
          },
        },
      });
    } else {
      this.state.usersRef
        .child(`${this.state.user.uid}/starred`)
        .child(this.state.channel.id)
        .remove((err) => {
          if (err !== null) {
            console.log(err);
          }
        });
    }
  };
  displayTypingUsers = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "0.2em" }}
        key={user.id}
      >
        <span className="user__typing">{user.name} is typing</span> <Typing />
      </div>
    ));

  displayMessagesSkeleton = (loading) =>
    loading && (
      <React.Fragment>
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </React.Fragment>
    );

  // isProgressBarVisible = (percent) => {
  //   if (percent > 0) {
  //     this.setState({ progressBar: true });
  //   }
  // };

  render() {
    const {
      messagesRef,
      messages,
      messagesLoading,
      channel,
      user,
      numUniqueUsers,
      searchResults,
      searchTerm,
      searchLoading,
      privateChannel,
      isChannelStarred,
      typingUsers,
    } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader
          numUniqueUsers={numUniqueUsers}
          channelName={this.displayChannelName(channel)}
          handleSearchChange={this.handleSearchChange}
          searchLoading={searchLoading}
          isPrivateChannel={privateChannel}
          handleStar={this.handleStar}
          isChannelStarred={isChannelStarred}
        />
        <Segment>
          <Comment.Group className="messages">
            {this.displayMessagesSkeleton(messagesLoading)}
            {searchTerm
              ? this.displayMessages(searchResults, user)
              : this.displayMessages(messages, user)}
            {this.displayTypingUsers(typingUsers)}
            <div ref={(node) => (this.messagesEnd = node)}></div>
          </Comment.Group>
        </Segment>
        <MessageForm
          messagesRef={messagesRef}
          currentUser={user}
          currentChannel={channel}
          isPrivateChannel={privateChannel}
          getMessagesRef={this.getMessagesRef}
          // isProgressBarVisible={this.isProgressBarVisible}
        />
      </React.Fragment>
    );
  }
}

export default connect(null, { setUserPosts })(Messages);
