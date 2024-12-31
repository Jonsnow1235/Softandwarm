export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          description: string;
          images: {
            url: string;
            color: string;
            isPrimary: boolean;
          }[];
          sizes: string[];
          colors: string[];
          color_names: {
            hex: string;
            name: string;
          }[];
          category: string;
          stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
          discount_price?: number | null;
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          full_name: string;
          phone_number: string;
          address: string;
          items: any[];
          total_cost: number;
          processed: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
    };
    Views: {
      processed_orders: {
        Row: Database['public']['Tables']['orders']['Row'];
      };
    };
  };
}