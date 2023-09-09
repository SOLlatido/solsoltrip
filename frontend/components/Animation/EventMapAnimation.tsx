import LottieView from 'lottie-react-native';

import { useRecoilState} from 'recoil';
import {centerModalState} from '../../recoil/centerModal/atom';

const EventMapAnimation = () => {

    const [modalVisible, setModalVisible] = useRecoilState(centerModalState);

    return(
        <LottieView source={require('../../assets/lottie/eventAnimation.json')} autoPlay loop/>
    )
}

export default EventMapAnimation