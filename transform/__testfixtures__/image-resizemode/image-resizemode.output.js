const React = require('react');
const ReactNative = require('react-native');
const {Image, View} = ReactNative;

class ImageExample extends React.Component{
    render() {
        return (
            <View>
                <Image
                    source={require('./img/check.png')}
                    resizeMode="stretch"
                    />
            </View>
        );
    }
}

module.exports = ImageExample;