import React, { useMemo, useRef, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import {
  mataKuliah,
  MataKuliah,
} from '../data/data';

// ===================== GREETING =====================

const getGreeting = () => {

  const hour = new Date().getHours();

  if (hour < 11) return '☀️ Selamat Pagi';
  if (hour < 15) return '🌤 Selamat Siang';
  if (hour < 18) return '🌇 Selamat Sore';

  return '🌙 Selamat Malam';

};

// ===================== CARD =====================

const MataKuliahCard = ({
  item,
}: {
  item: MataKuliah;
}) => (

  <View style={styles.card}>

    <View style={styles.cardTop}>

      <Text style={styles.namaMatkul}>
        {item.nama}
      </Text>

      <View style={styles.sksBadge}>
        <Text style={styles.sksText}>
          {item.sks} SKS
        </Text>
      </View>

    </View>

    <Text style={styles.kode}>
      📚 {item.kode}
    </Text>

    <View style={styles.divider} />

    <Text style={styles.dosen}>
      👨‍🏫 {item.dosen}
    </Text>

  </View>

);

// ===================== SCREEN =====================

const RingkasanScreen = () => {

  const scrollRef =
    useRef<ScrollView>(null);

  const [search, setSearch] =
    useState('');

  const [refreshing, setRefreshing] =
    useState(false);

  const filteredData =
    useMemo(() => {

      return mataKuliah.filter(item =>

        item.nama
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        item.kode
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        item.dosen
          .toLowerCase()
          .includes(search.toLowerCase())

      );

    }, [search]);

  const totalSKS =
    filteredData.reduce(
      (acc, item) => acc + item.sks,
      0
    );

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView

        ref={scrollRef}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {

              setRefreshing(true);

              setTimeout(() => {
                setRefreshing(false);
              }, 1000);

            }}
          />
        }

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingBottom: 120,
        }}

      >

        {/* HEADER */}

        <View style={styles.pageHeader}>

          <Text style={styles.greeting}>
            {getGreeting()}
          </Text>

          <Text style={styles.pageTitle}>
            Ringkasan Mata Kuliah
          </Text>

          <Text style={styles.pageSubtitle}>
            Semester Genap 2026
          </Text>

        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>

          <TextInput
            placeholder="🔍 Cari mata kuliah..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />

        </View>

        {/* STATISTIK */}

        <View style={styles.statContainer}>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>
              {filteredData.length}
            </Text>

            <Text style={styles.statLabel}>
              Mata Kuliah
            </Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>
              {totalSKS}
            </Text>

            <Text style={styles.statLabel}>
              Total SKS
            </Text>

          </View>

        </View>

        {/* LIST */}

        {filteredData.length > 0 ? (

          filteredData.map(item => (

            <MataKuliahCard
              key={item.id}
              item={item}
            />

          ))

        ) : (

          <View
            style={{
              alignItems: 'center',
              marginTop: 80,
            }}>

            <Text style={{fontSize:70}}>
              📚
            </Text>

            <Text
              style={{
                marginTop:15,
                fontSize:20,
                fontWeight:'bold'
              }}>
              Mata kuliah tidak ditemukan
            </Text>

          </View>

        )}

      </ScrollView>

      {/* FAB */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          scrollRef.current?.scrollTo({
            y:0,
            animated:true
          })
        }>

        <Text style={styles.fabText}>
          ↑
        </Text>

      </TouchableOpacity>

    </SafeAreaView>

  );

};

export default RingkasanScreen;

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
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  pageSubtitle: {
    marginTop: 6,
    color: '#E0E7FF',
    fontSize: 15,
    textAlign: 'center',
  },

  // ================= SEARCH =================

  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
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

  // ================= STAT =================

  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
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

  statLabel: {
    marginTop: 5,
    color: '#64748B',
    fontSize: 13,
  },

  // ================= CARD =================

  card: {
    backgroundColor: '#FFFFFF',

    marginHorizontal: 20,
    marginTop: 15,

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

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  namaMatkul: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0F172A',
    marginRight: 10,
  },

  sksBadge: {
    backgroundColor: '#DBEAFE',

    paddingHorizontal: 14,
    paddingVertical: 7,

    borderRadius: 20,
  },

  sksText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 12,
  },

  kode: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
  },

  dosen: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
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