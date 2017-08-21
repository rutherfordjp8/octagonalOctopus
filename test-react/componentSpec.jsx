import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { assert, expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import 'jsdom-global/register';
import WelcomeScreen from '../react-client/src/components/WelcomeScreen';
import GameOwnerEnterNameScreen from '../react-client/src/components/GameOwnerEnterNameScreen';
import PlayerEnterNameScreen from '../react-client/src/components/PlayerEnterNameScreen';
import Timer from '../react-client/src/components/Timer';
import MerlinChoiceScreen from '../react-client/src/components/MerlinChoiceScreen';
import MissionVoteScreen from '../react-client/src/components/MissionVoteScreen';
import InfoPanel from '../react-client/src/components/InfoPanel';
chai.use(chaiEnzyme());

describe("WelcomeScreen component", () => {
  it("renders correctly", () => {
    const wrapper = mount(<WelcomeScreen />);

    expect(wrapper.find(WelcomeScreen)).to.have.length(1);
  });

  it("calls pageSelector", () => {
    sinon.spy(WelcomeScreen.prototype, 'pageSelector');
    const wrapper = mount(<WelcomeScreen />);
    expect(WelcomeScreen.prototype.pageSelector).to.have.property('callCount', 1);
    WelcomeScreen.prototype.pageSelector.restore();
  });

  it("can find welcomeScreenInput", () => {
    const wrapper = mount(<WelcomeScreen />);


    expect(wrapper.find('.welcomeScreenInput')).to.be.present();
    expect(wrapper.find('.welcomeScreenInput')).to.exist;
  });

  it('has 2 buttons', () => {
    const wrapper = shallow((
      <WelcomeScreen />
    ));
    expect(wrapper.find('button')).to.have.length(2);
  });
});

describe("GameOwnerEnterNameScreen component", () => {
  it("renders correctly", () => {
    const wrapper = mount(<GameOwnerEnterNameScreen />);
    expect(wrapper.find(GameOwnerEnterNameScreen)).to.have.length(1);
  });

  it("it has form to process game owner information", () => {
    const wrapper = shallow((<GameOwnerEnterNameScreen />));
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('has 1 buttons', () => {
    const wrapper = shallow((<GameOwnerEnterNameScreen />));
    expect(wrapper.find('button')).to.have.length(1);
  });
});

describe("PlayerEnterNameScreen component", () => {
  it("renders correctly", () => {
    const wrapper = mount(<PlayerEnterNameScreen />);
    expect(wrapper.find(PlayerEnterNameScreen)).to.have.length(1);
  });

  it("it has form to process game owner information", () => {
    const wrapper = shallow((<PlayerEnterNameScreen />));
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('has 1 buttons', () => {
    const wrapper = shallow((<PlayerEnterNameScreen />));
    expect(wrapper.find('button')).to.have.length(1);
  });
});

describe("Timer component", () => {
  it("renders correctly", () => {
    const wrapper = mount(<Timer />);
    expect(wrapper.find(Timer)).to.have.length(1);
  });

  it("calls startTimer", () => {
    sinon.spy(Timer.prototype, 'startTimer');
    const wrapper = mount(<Timer />);
    expect(Timer.prototype.startTimer).to.have.property('callCount', 1);
    Timer.prototype.startTimer.restore();
  });
});


describe("MerlinChoiceScreen component", () => {
  it("renders correctly", () => {
    const wrapper = mount(<MerlinChoiceScreen players={['pats bf', 'yang', 'patrick', 'abhi', 'melissa']} />);
    expect(wrapper.find(MerlinChoiceScreen)).to.have.length(1);
  });

  it("has a new form", () => {
    const wrapper = shallow((<MerlinChoiceScreen players={['pats bf', 'yang', 'patrick', 'abhi', 'melissa']} />));
    expect(wrapper.find('form')).to.have.length(1);
  });

  it("contains an InfoPanel component", () => {
    const wrapper = mount(<MerlinChoiceScreen players={['pats bf', 'yang', 'patrick', 'abhi', 'melissa']} />);
    expect(wrapper).to.containMatchingElement(<InfoPanel />)
  });
});

describe("MissionVoteScreen component", () => {
  it("renders correctly", () => {
    const wrapper = mount(<MissionVoteScreen missionPlayers={['pats bf', 'yang']} />);

    expect(wrapper.find(MissionVoteScreen)).to.have.length(1);
  });

  it("has 2 buttons", () => {
    const wrapper = shallow((<MissionVoteScreen missionPlayers={['pats bf', 'yang']} />));
    expect(wrapper.find('button')).to.have.length(2);
  });

  it("contains an InfoPanel component", () => {
    const wrapper = mount(<MissionVoteScreen missionPlayers={['pats bf', 'yang', 'patrick', 'abhi', 'melissa']} />);
    expect(wrapper).to.containMatchingElement(<InfoPanel />)
  });
});
