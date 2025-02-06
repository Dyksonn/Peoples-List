import { Header } from '@/components/Header';
import { servicePeople } from '@/service/service-peoples';
import Swipeable, {
    SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import { People } from '@/types/people';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Option } from '@/components/Options';
import { Card } from '@/components/Card';
import { ModalConfirmDelete } from '@/components/ModalConfirmDelete';

export default function Page() {
    const [peoples, setPeoples] = useState<People[]>([]);
    const [filteredPeople, setFilteredPeople] = useState<People[]>([]);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedPerson, setSelectedPerson] = useState<People | null>(null);

    function handleToPeopleId(id: string) {
        router.navigate(`/pessoas/${id}`);
    }

    function handleDeletePerson(person: People) {
        setSelectedPerson(person);
        setDeleteModalVisible(true);
    }

    async function onDeletePeople() {
        if (selectedPerson) {
            await servicePeople.deletePeople(selectedPerson.id);
            setDeleteModalVisible(false);
            fetchPeoples();
        }
    }

    async function fetchPeoples() {
        const response = await servicePeople.listPeople();

        setPeoples(response.peoples);
        setFilteredPeople(response.peoples);
    }

    useEffect(() => {
        fetchPeoples();
    }, []);


    useEffect(() => {
        const filtered = Array.isArray(peoples) ? peoples.filter(person =>
            Object.values(person).some(value =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        ) : [];
        setFilteredPeople(filtered);
    }, [search]);

    return (
        <View className='flex-1'>
            <Header
                search
                onSearch={setSearch}
                placeholder='Pesquisar pessoas...'
                placeholderTextColor="white"
            />

            <FlatList
                data={filteredPeople}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    let current: SwipeableMethods | null = null

                    return (
                        <Swipeable
                            ref={(swipeable) => (current = swipeable)}
                            overshootRight={false}
                            containerStyle={{
                                backgroundColor: "#1D1F27",
                                borderRadius: 5,
                            }}
                            renderRightActions={() => (
                                <View
                                    className='flex-row'
                                >
                                    <Option onPress={() => handleToPeopleId(item.id)} icon="edit" backgroundColor="#3E68D7" />
                                </View>
                            )}
                            renderLeftActions={() => (
                                <View
                                    className='flex-row'
                                >
                                    <Option icon="delete" backgroundColor="#E83D55" onPress={() => handleDeletePerson(item)} />
                                </View>
                            )}
                        >
                            <Card name={item.name} email={item.email} />
                        </Swipeable>
                    )
                }}
                contentContainerClassName='gap-3.5 p-5'
                showsVerticalScrollIndicator={false}
            />

            {isDeleteModalVisible && (
                <ModalConfirmDelete
                    visible={isDeleteModalVisible}
                    onCancel={() => setDeleteModalVisible(false)}
                    onDelete={onDeletePeople}
                    title='Excluir Pessoa'
                    message={`Deseja excluir ${selectedPerson?.name}?`}
                />
            )}
        </View>
    );
}