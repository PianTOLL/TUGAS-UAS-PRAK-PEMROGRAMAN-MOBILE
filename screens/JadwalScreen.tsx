import React, { useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import {
  jadwalPerHari,
  JadwalItem,
  JadwalSection,
} from '../data/data';

// ===================== GREETING =====================

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 11) return '☀️ Selamat Pagi';
  if (hour < 15) return '🌤 Selamat Siang';
  if (hour < 18) return '🌇 Selamat Sore';

  return '🌙 Selamat Malam';
};

// ===================== HARI INI =====================

const hariIni = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
][new Date().getDay()];

// ===================== HEADER =====================

const ListHeader = ({
  total,
}: {
  total: number;
}) => (
  <View style={styles.listHeader}>
    <Text style={styles.listHeaderTitle}>
      📚 Jadwal Perkuliahan
    </Text>

    <Text style={styles.listHeaderSubtitle}>
      Cari mata kuliah dengan mudah
    </Text>

    <View style={styles.statContainer}>

      <View style={styles.statCard}>
        <Text style={styles.statNumber}>
          {total}
        </Text>

        <Text style={styles.statText}>
          Mata Kuliah
        </Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statNumber}>
          {jadwalPerHari.length}
        </Text>

        <Text style={styles.statText}>
          Hari Aktif
        </Text>
      </View>

    </View>
  </View>
);

// ===================== SECTION =====================

const SectionHeader = ({
  section,
}: {
  section: JadwalSection;
}) => {

  const active = section.title === hariIni;

  return (
    <View
      style={[
        styles.sectionHeader,
        active && styles.activeSection,
      ]}>

      <Text style={styles.sectionHeaderText}>
        {active ? '🔥 ' : '📅 '}
        {section.title}
      </Text>

    </View>
  );
};

// ===================== CARD =====================

const JadwalCard = ({
  item,
}: {
  item: JadwalItem;
}) => (
  <View style={styles.card}>

    <View style={styles.timeBadge}>
      <Text style={styles.timeText}>
        🕒 {item.jamMulai} - {item.jamSelesai}
      </Text>
    </View>

    <Text style={styles.namaMatkul}>
      {item.matkul}
    </Text>

    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>
        📍
      </Text>

      <Text style={styles.infoText}>
        {item.ruangan}
      </Text>
    </View>

  </View>
);

// ===================== SCREEN =====================

const JadwalScreen = () => {

  const listRef =
    useRef<SectionList<JadwalItem>>(null);

  const [search, setSearch] =
    useState('');

  const [refreshing, setRefreshing] =
    useState(false);

  const totalMatkul =
    jadwalPerHari.reduce(
      (acc, item) => acc + item.data.length,
      0
    );

  const filteredData = useMemo(() => {

    return jadwalPerHari
      .map(section => ({
        ...section,

        data: section.data.filter(item =>
          item.matkul
            .toLowerCase()
            .includes(search.toLowerCase())
        ),
      }))
      .filter(
        section => section.data.length > 0
      );

  }, [search]);

  const renderItem:
    SectionListRenderItem<
      JadwalItem,
      JadwalSection
    > = ({ item }) => (
      <JadwalCard item={item} />
    );

  const onRefresh = () => {

    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (

    <SafeAreaView style={styles.safeArea}>

      {/* HEADER */}

      <View style={styles.pageHeader}>

        <Text style={styles.greeting}>
          {getGreeting()}
        </Text>

        <Text style={styles.pageTitle}>
          Jadwal Kuliah
        </Text>

        <Text style={styles.pageSubtitle}>
          Semester Genap 2026
        </Text>

      </View>

      {/* SEARCH */}

      <View style={styles.searchContainer}>

        <TextInput
          placeholder="🔍 Cari Mata Kuliah..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

      </View>

      {/* LIST */}

      <SectionList
        ref={listRef}
        sections={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <SectionHeader section={section} />
        )}
        ListHeaderComponent={
          <ListHeader total={totalMatkul} />
        }
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View
            style={{
              marginTop: 60,
              alignItems: 'center',
            }}>

            <Text
              style={{
                fontSize: 70,
              }}>
              🔍
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginTop: 15,
                fontWeight: 'bold',
              }}>
              Mata kuliah tidak ditemukan
            </Text>

          </View>
        }
      />
            {/* Floating Button */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          listRef.current?.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            animated: true,
          });
        }}>
        <Text style={styles.fabText}>↑</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default JadwalScreen;

// ===================== STYLES =====================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },

  pageHeader: {
    backgroundColor: '#2563EB',
    paddingTop: 35,
    paddingBottom: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 10,
  },

  greeting: {
    color: '#E0E7FF',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 6,
    fontWeight: '600',
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  pageSubtitle: {
    marginTop: 6,
    color: '#DBEAFE',
    textAlign: 'center',
    fontSize: 15,
  },

  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 5,
  },

  searchInput: {
    backgroundColor: '#fff',
    height: 52,
    borderRadius: 15,
    paddingHorizontal: 18,
    fontSize: 15,
    elevation: 5,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  listHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  listHeaderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  listHeaderSubtitle: {
    marginTop: 5,
    color: '#64748B',
    fontSize: 14,
  },

  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  statCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',

    elevation: 5,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  statNumber: {
    fontSize: 28,
    color: '#2563EB',
    fontWeight: 'bold',
  },

  statText: {
    marginTop: 5,
    color: '#64748B',
    fontSize: 13,
  },

  sectionHeader: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,

    backgroundColor: '#3B82F6',

    paddingHorizontal: 18,
    paddingVertical: 8,

    borderRadius: 30,
  },

  activeSection: {
    backgroundColor: '#10B981',
  },

  sectionHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 13,
  },

  card: {
    backgroundColor: '#fff',

    marginHorizontal: 20,
    marginBottom: 16,

    borderRadius: 20,

    padding: 20,

    elevation: 6,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    borderLeftWidth: 6,
    borderLeftColor: '#3B82F6',
  },

  timeBadge: {
    alignSelf: 'flex-start',

    backgroundColor: '#DBEAFE',

    paddingHorizontal: 15,
    paddingVertical: 7,

    borderRadius: 25,
  },

  timeText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 12,
  },

  namaMatkul: {
    marginTop: 15,
    marginBottom: 15,

    fontSize: 20,
    fontWeight: 'bold',

    color: '#0F172A',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  infoText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
  },

  fab: {
    position: 'absolute',

    right: 20,
    bottom: 25,

    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: '#2563EB',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 10,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});