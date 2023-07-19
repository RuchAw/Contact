import React from 'react';
import { View, Text } from 'react-native';


function Infos({route}) {
    console.log('from infos: ', route.params )
    return (
        <View>
            <Text>
                Infos details
            </Text>
        </View>
    )
}

export default Infos