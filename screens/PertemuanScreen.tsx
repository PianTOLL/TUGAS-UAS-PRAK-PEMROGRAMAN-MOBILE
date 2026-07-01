import React, { useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import {
  pertemuan,
  Pertemuan,
} from '../data/data';

// ===================== GREETING =====================

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 11) return '☀️ Selamat Pagi';
  if (hour < 15) return '🌤 Selamat Siang';
  if (hour < 18) return '🌇 Selamat Sore';

  return '🌙 Selamat Malam';
};

// ===================== HEADER =====================

const Header = ({
  total,
}: {
  total: number;
}) => (
  <View style={styles.listHeader}>
    <Text style={styles.listTitle}>
      📖 Daftar Pertemuan
    </Text>

    <Text style={styles.listSubtitle}>
      Semua riwayat pertemuan selama semester
    </Text>

    <View style={styles.statContainer}>

      <View style={styles.statCard}>
        <Text style={styles.statNumber}>
          {total}
        </Text>

        <Text style={styles.statText}>
          Total Pertemuan
        </Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statNumber}>
          {new Date().getFullYear()}
        </Text>

        <Text style={styles.statText}>
          Tahun Akademik
        </Text>
      </View>

    </View>
  </View>
);

// ===================== CARD =====================

const PertemuanCard = ({
  item,
}: {
  item: Pertemuan;
}) => (
  <View style={styles.card}>

    <View style={styles.topRow}>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          Pertemuan {item.pertemuanKe}
        </Text>
      </View>

      <Text style={styles.date}>
        📅 {item.tanggal}
      </Text>

    </View>

    <Text style={styles.matkul}>
      {item.matkul}
    </Text>

    <Text style={styles.topik}>
      📝 {item.topik}
    </Text>

  </View>
);

// ===================== SCREEN =====================

const PertemuanScreen = () => {

  const listRef =
    useRef<FlatList<Pertemuan>>(null);

  const [search, setSearch] =
    useState('');

  const [refreshing, setRefreshing] =
    useState(false);

  const filteredData = useMemo(() => {

    return pertemuan.filter(item =>
      item.matkul
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.topik
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search]);

  const renderItem:
    ListRenderItem<Pertemuan> =
    ({ item }) => (
      <PertemuanCard item={item} />
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
          Pertemuan Kuliah
        </Text>

        <Text style={styles.pageSubtitle}>
          Semester Ganjil
        </Text>

      </View>

      {/* SEARCH */}

      <View style={styles.searchContainer}>

        <TextInput
          placeholder="🔍 Cari mata kuliah atau topik..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

      </View>

      {/* LIST */}

      <FlatList
        ref={listRef}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <Header total={pertemuan.length} />
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: 12 }} />
        )}
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
              alignItems: 'center',
              marginTop: 80,
            }}>

            <Text
              style={{
                fontSize: 70,
              }}>
              📚
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              Data tidak ditemukan
            </Text>

            <Text
              style={{
                color: '#666',
                marginTop: 8,
              }}>
              Coba gunakan kata kunci lain
            </Text>

          </View>

        }
      />

      {/* Floating Button */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          listRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
          })
        }>

        <Text style={styles.fabText}>
          ↑
        </Text>

      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default PertemuanScreen;

// ===================== STYLES =====================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },

  // ================= HEADER =================

  pageHeader: {
    backgroundColor: '#2563EB',
    paddingTop: 35,
    paddingBottom: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 10,
  },

  greeting: {
    color: '#DBEAFE',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  pageSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#E0E7FF',
    textAlign: 'center',
  },

  // ================= SEARCH =================

  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 5,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 18,
    fontSize: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 5,
  },

  // ================= HEADER LIST =================

  listHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  listSubtitle: {
    marginTop: 5,
    color: '#64748B',
    fontSize: 14,
  },

  // ================= STAT =================

  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',

    marginHorizontal: 5,

    borderRadius: 18,

    paddingVertical: 18,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  statText: {
    marginTop: 5,
    fontSize: 13,
    color: '#64748B',
  },

  // ================= CARD =================

  card: {
    backgroundColor: '#FFFFFF',

    marginHorizontal: 20,

    borderRadius: 20,

    padding: 20,

    borderLeftWidth: 6,
    borderLeftColor: '#2563EB',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 6,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  badge: {
    backgroundColor: '#DBEAFE',

    paddingHorizontal: 15,
    paddingVertical: 7,

    borderRadius: 25,
  },

  badgeText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: 'bold',
  },

  date: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },

  matkul: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  topik: {
    marginTop: 10,
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },

  // ================= FLOATING BUTTON =================

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

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 10,
  },

  fabText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
});